import {
  instance as InstanceRep,
  operationSystem as OperationSystemRep,
} from '~/data/repositories/repositories';
import {
  SCInstanceCreateRequestDto,
  SCInstanceCreateResponseDto,
  TokenPayload,
} from '~/common/types/types';
import { Instance as InstanceEntity } from './instance.entity';
import {
  keyPair as KeyPairServ,
  ec2 as EC2Serv,
  token as tokenServ,
} from '~/services/services';
import { InstanceDefaultParam } from '~/common/enums/enums';
import { UserRole } from '~/common/enums/roles/roles';
import { InvalidCredentialsError } from '~/exceptions/invalid-credentials-error/invalid-credentials-error';
import { HttpCode } from '~/common/enums/http/http';
import { ExceptionMessage } from '~/common/enums/exception/exception-message.enum';

type Constructor = {
  instanceRepository: typeof InstanceRep;
  operationSystemRepository: typeof OperationSystemRep;
  keyPairService: typeof KeyPairServ;
  ec2Service: typeof EC2Serv;
  tokenService: typeof tokenServ;
};

class Instance {
  #instanceRepository: typeof InstanceRep;
  #operationSystemRepository: typeof OperationSystemRep;
  #keyPairService: typeof KeyPairServ;
  #ec2Service: typeof EC2Serv;
  #tokenService: typeof tokenServ;

  constructor({
    instanceRepository,
    operationSystemRepository,
    keyPairService,
    ec2Service,
    tokenService,
  }: Constructor) {
    this.#instanceRepository = instanceRepository;
    this.#operationSystemRepository = operationSystemRepository;
    this.#keyPairService = keyPairService;
    this.#ec2Service = ec2Service;
    this.#tokenService = tokenService;
  }

  public async getImageId(operationSystemId: string): Promise<string> {
    const operationSystem = await this.#operationSystemRepository.getById(
      operationSystemId,
    );
    return operationSystem!.awsGenerationName;
  }

  public async create({
    instanceCredentials,
    token,
  }: {
    instanceCredentials: SCInstanceCreateRequestDto;
    token: string;
  }): Promise<SCInstanceCreateResponseDto> {
    const { name, operationSystemId } = instanceCredentials;
    const { userId, userRole, tenantId }: TokenPayload =
      await this.#tokenService.decode(token);
    if (userRole !== UserRole.WORKER) {
      throw new InvalidCredentialsError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.MASTER_INSTANCE_CREATE,
      });
    }

    const keyPairId = await this.#keyPairService.create();
    const { hostname, instanceId } = await this.#ec2Service.createInstance({
      name,
      keyName: keyPairId,
      imageId: await this.getImageId(operationSystemId),
    });

    const instance = InstanceEntity.createNew({
      name,
      keyPairId,
      username: InstanceDefaultParam.USERNAME as string,
      hostname: hostname,
      operationSystemId,
      createdBy: userId,
      awsInstanceId: instanceId,
      tenantId,
    });

    const {
      id,
      name: instanceName,
      createdAt,
      hostname: instanceHostname,
    } = await this.#instanceRepository.create(instance);

    return {
      instanceId: id,
      instanceType: InstanceDefaultParam.INSTANCE_TYPE as string,
      name: instanceName,
      createdAt,
      publicDNS: instanceHostname,
    };
  }
}

export { Instance };
