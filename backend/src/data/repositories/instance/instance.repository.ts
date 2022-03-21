import { Instance as InstanceM } from '~/data/models/models';
import { Instance as InstanceEntity } from '~/services/instance/instance.entity';
import { SCInstanceGetByTenantRequestParamsDto } from '~/common/types/types';
import { InstanceState } from '~/common/enums/enums';

type Constructor = {
  InstanceModel: typeof InstanceM;
};

class Instance {
  #InstanceModel: typeof InstanceM;

  constructor({ InstanceModel }: Constructor) {
    this.#InstanceModel = InstanceModel;
  }

  public async updateById(
    id: string,
    data: {
      name?: string;
      state?: InstanceState;
      hostname?: string;
    },
  ): Promise<InstanceEntity> {
    return this.#InstanceModel.query().patchAndFetchById(id, data);
  }

  public async delete(id: string): Promise<number> {
    return this.#InstanceModel.query().deleteById(id).first();
  }

  public async getById(id: string): Promise<InstanceEntity | null> {
    const instance = await this.#InstanceModel
      .query()
      .select()
      .where({ id })
      .first();

    if (!instance) {
      return null;
    }

    return Instance.modelToEntity(instance);
  }

  public async getByWorkerId(workerId: string): Promise<InstanceEntity[]> {
    const instances = await this.#InstanceModel
      .query()
      .select()
      .where({ 'createdBy': workerId });

    return instances.map(Instance.modelToEntity);
  }

  public async getByTenantId({
    filter,
    tenantId,
  }: {
    filter: SCInstanceGetByTenantRequestParamsDto;
    tenantId: string;
  }): Promise<InstanceEntity[]> {
    const { from: offset, count: limit } = filter;
    const instances = await this.#InstanceModel
      .query()
      .select()
      .where({ tenantId })
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit);

    return instances.map(Instance.modelToEntity);
  }

  public async getInstancesByDate(date: string): Promise<InstanceM[]> {
    return this.#InstanceModel.query().select().where('createdAt', '<', date);
  }

  public async create(instance: InstanceEntity): Promise<InstanceM> {
    const {
      id,
      name,
      createdAt,
      keyPairId,
      username,
      hostname,
      operationSystemId,
      createdBy,
      awsInstanceId,
      tenantId,
      state,
    } = instance;
    return this.#InstanceModel.query().insert({
      id,
      name,
      createdAt,
      keyPairId,
      username,
      hostname,
      operationSystemId,
      createdBy,
      awsInstanceId,
      tenantId,
      state,
    });
  }

  public static modelToEntity(model: InstanceM): InstanceEntity {
    const {
      id,
      name,
      createdAt,
      keyPairId,
      username,
      hostname,
      operationSystemId,
      createdBy,
      awsInstanceId,
      tenantId,
      state,
    } = model;

    return InstanceEntity.initialize({
      id,
      name,
      createdAt,
      keyPairId,
      username,
      hostname,
      operationSystemId,
      createdBy,
      awsInstanceId,
      tenantId,
      state,
    });
  }
}

export { Instance };
