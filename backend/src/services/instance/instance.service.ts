import { EventEmitter } from 'events';
import { instance as InstanceRep } from '~/data/repositories/repositories';
import {
  SCInstanceCreateRequestDto,
  SCInstanceCreateResponseDto,
  SCInstanceGetByTenantRequestParamsDto,
  SCInstanceGetByTenantResponseDto,
  SCInstanceUpdateResponseDto,
  TokenPayload,
} from '~/common/types/types';
import { Instance as InstanceEntity } from './instance.entity';
import {
  keyPair as KeyPairServ,
  ec2 as EC2Serv,
  token as tokenServ,
  operationSystem as OperationSystemServ,
} from '~/services/services';
import {
  InstanceDefaultParam,
  UserRole,
  HttpCode,
  ExceptionMessage,
  Event,
} from '~/common/enums/enums';
import { SCError } from '~/exceptions/exceptions';

type Constructor = {
  instanceRepository: typeof InstanceRep;
  operationSystemService: typeof OperationSystemServ;
  keyPairService: typeof KeyPairServ;
  ec2Service: typeof EC2Serv;
  tokenService: typeof tokenServ;
  eventService: EventEmitter;
};

class Instance {
  #instanceRepository: typeof InstanceRep;
  #operationSystemService: typeof OperationSystemServ;
  #keyPairService: typeof KeyPairServ;
  #ec2Service: typeof EC2Serv;
  #tokenService: typeof tokenServ;
  #eventService: EventEmitter;

  constructor({
    instanceRepository,
    operationSystemService,
    keyPairService,
    ec2Service,
    tokenService,
    eventService,
  }: Constructor) {
    this.#instanceRepository = instanceRepository;
    this.#operationSystemService = operationSystemService;
    this.#keyPairService = keyPairService;
    this.#ec2Service = ec2Service;
    this.#tokenService = tokenService;
    this.#eventService = eventService;
  }

  public async getByTenantId({
    requestParams,
    token,
  }: {
    requestParams: SCInstanceGetByTenantRequestParamsDto;
    token: string;
  }): Promise<SCInstanceGetByTenantResponseDto> {
    const { tenantId }: TokenPayload = await this.#tokenService.decode(token);
    const instances = await this.#instanceRepository.getByTenantId({
      filter: requestParams,
      tenantId,
    });

    return {
      items: instances.map(
        ({
          name,
          id,
          awsInstanceId,
          createdAt,
          hostname,
          keyPairId,
          state,
        }) => ({
          name,
          id,
          awsInstanceId,
          instanceType: InstanceDefaultParam.INSTANCE_TYPE as string,
          createdAt,
          publicIpAddress: hostname,
          keyPairId,
          state,
        }),
      ),
    };
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
      throw new SCError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.MASTER_INSTANCE_CREATE,
      });
    }

    const keyPairId = await this.#keyPairService.create();
    const { state, instanceId } = await this.#ec2Service.createInstance({
      name,
      keyName: keyPairId,
      imageId: await this.#operationSystemService.getImageId(operationSystemId),
    });

    const instance = InstanceEntity.createNew({
      name,
      keyPairId,
      username: InstanceDefaultParam.USERNAME as string,
      hostname: '',
      operationSystemId,
      createdBy: userId,
      awsInstanceId: instanceId,
      tenantId,
      state,
    });

    const { id } = await this.#instanceRepository.create(instance);

    this.#eventService.on(Event.ADD_NEW_INSTANCE, async ({ id, awsId }) => {
      const { hostname, state } = await this.#ec2Service.getRunningInstanceData(
        awsId,
      );
      await this.update(id, { hostname, state });
    });

    this.#eventService.emit(Event.ADD_NEW_INSTANCE, { id, awsId: instanceId });

    return {
      instanceId: instance.id,
      instanceType: InstanceDefaultParam.INSTANCE_TYPE as string,
      name: instance.name,
      createdAt: instance.createdAt,
      publicIpAddress: instance.hostname,
      state: instance.state,
    };
  }

  public async update(
    id: string,
    data: {
      name?: string;
      state?: string;
      hostname?: string;
    },
  ): Promise<SCInstanceUpdateResponseDto> {
    const instance = await this.#instanceRepository.getById(id);
    if (!instance) {
      throw new SCError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.INSTANCE_NOT_FOUND,
      });
    }

    const { name } = data;

    if (!Object.keys(data).length || name === instance.name) {
      throw new SCError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.NOTHING_TO_UPDATE,
      });
    }

    if (name) {
      const { awsInstanceId } = (await this.#instanceRepository.getById(
        id,
      )) as InstanceEntity;
      await this.#ec2Service.setInstanceName(awsInstanceId, name as string);
    }

    const updateInstance = await this.#instanceRepository.updateById(id, data);
    return {
      instanceId: updateInstance.id,
      instanceType: InstanceDefaultParam.INSTANCE_TYPE as string,
      name: updateInstance.name,
      createdAt: updateInstance.createdAt,
      publicIpAddress: updateInstance.hostname,
    };
  }

  public async delete(id: string): Promise<void> {
    const instance = await this.#instanceRepository.getById(id);
    if (!instance) {
      throw new SCError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.INSTANCE_NOT_FOUND,
      });
    }
    const { awsInstanceId, keyPairId } = instance;
    await this.#ec2Service.deleteInstance(awsInstanceId);
    await this.#instanceRepository.delete(id);
    await this.#ec2Service.deleteKeyPair(keyPairId);
    await this.#keyPairService.delete(keyPairId);
  }
}

export { Instance };
