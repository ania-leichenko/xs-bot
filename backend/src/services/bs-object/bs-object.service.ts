import { bsObject as bsObjectRep } from '~/data/repositories/repositories';
import {
  s3 as s3Serv,
  space as spaceServ,
  token as tokenServ,
  worker as workerServ,
} from '~/services/services';
import { BSObject as BSObjectEntity } from './bs-object.entity';
import { TokenPayload } from 'bws-shared/common/types/types';
import { HttpCode } from '~/common/enums/http/http';
import { ExceptionMessage, UserRole } from '~/common/enums/enums';
import { BsError } from '~/exceptions/exceptions';
import { UploadPayload } from '~/common/types/types';
import { GetObjectCommandOutput } from '@aws-sdk/client-s3';

type Constructor = {
  bsObjectRepository: typeof bsObjectRep;
  s3Service: typeof s3Serv;
  spaceService: typeof spaceServ;
  tokenService: typeof tokenServ;
  workerService: typeof workerServ;
};
class BSObject {
  #bsObjectRepository: typeof bsObjectRep;
  #s3Service: typeof s3Serv;
  #spaceService: typeof spaceServ;
  #tokenService: typeof tokenServ;
  #workerService: typeof workerServ;

  constructor({
    bsObjectRepository,
    s3Service,
    spaceService,
    tokenService,
    workerService,
  }: Constructor) {
    this.#bsObjectRepository = bsObjectRepository;
    this.#s3Service = s3Service;
    this.#spaceService = spaceService;
    this.#tokenService = tokenService;
    this.#workerService = workerService;
  }

  public async upload({
    token,
    file,
    id,
  }: UploadPayload): Promise<BSObjectEntity> {
    const user: TokenPayload = await this.#tokenService.decode(token);

    if (user.userRole !== UserRole.WORKER) {
      throw new BsError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.MASTER_OBJECT_UPLOAD,
      });
    }

    const space = await this.#spaceService.getSpaceById(id);

    const worker = await this.#workerService.getUserById(space.createdBy);
    const isCurrentWorkerOwnerOfSpace =
      worker?.user?.tenantId === user.tenantId;
    const hasFile = file;

    if (!isCurrentWorkerOwnerOfSpace || !hasFile) {
      throw new BsError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.OBJECT_NOT_UPLOADED,
      });
    }
    const { ETag: awsObjectKey } = await this.#s3Service.uploadObject({
      spaceName: space.name,
      file: file.buffer as Buffer,
      fileName: file.originalname,
    });

    if (!awsObjectKey) {
      throw new BsError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.OBJECT_NOT_UPLOADED,
      });
    }
    const objectUploadEntity = BSObjectEntity.createNew({
      name: file.originalname,
      sizeInBytes: file.size as number,
      spaceId: space.id,
      uploadedBy: user.userId,
      awsObjectKey: awsObjectKey.substring(1, awsObjectKey.length - 1),
    });
    return this.#bsObjectRepository.create(objectUploadEntity);
  }

  public async download({
    token,
    spaceId,
    objectId,
  }: {
    token: string;
    spaceId: string;
    objectId: string;
  }): Promise<GetObjectCommandOutput> {
    const user: TokenPayload = await this.#tokenService.decode(token);

    if (user.userRole !== UserRole.WORKER) {
      throw new BsError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.MASTER_OBJECT_DOWNLOAD,
      });
    }

    const space = await this.#spaceService.getSpaceById(spaceId);

    const object = await this.#bsObjectRepository.getById(objectId);

    if (!object) {
      throw new BsError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.OBJECT_NOT_FOUND,
      });
    }

    return this.#s3Service.downloadObject({
      bucket: space.name,
      key: object.name,
    });
  }
}

export { BSObject };
