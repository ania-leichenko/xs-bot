import { Instance as InstanceM } from '~/data/models/models';
import { Instance as InstanceEntity } from '~/services/instance/instance.entity';
import { SCInstanceGetByTenantRequestParamsDto } from '~/common/types/types';

type Constructor = {
  InstanceModel: typeof InstanceM;
};

class Instance {
  #InstanceModel: typeof InstanceM;

  constructor({ InstanceModel }: Constructor) {
    this.#InstanceModel = InstanceModel;
  }

  public async updateById(instance: InstanceEntity): Promise<InstanceEntity> {
    return this.#InstanceModel
      .query()
      .withGraphFetched('[operationSystem]')
      .patchAndFetchById(instance.id, instance);
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
    return this.#InstanceModel
      .query()
      .select()
      .where({ tenantId })
      .withGraphFetched('[operationSystem]')
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit);
  }

  public getCount(tenantId: string): Promise<number> {
    return this.#InstanceModel
      .query()
      .select()
      .where({ tenantId })
      .resultSize();
  }

  public async getInstancesByDate(date: string): Promise<InstanceM[]> {
    return this.#InstanceModel.query().select().where('createdAt', '<', date);
  }

  public async create(instance: InstanceEntity): Promise<InstanceEntity> {
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
    return this.#InstanceModel
      .query()
      .insert({
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
      })
      .withGraphFetched('[operationSystem]');
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
      operationSystem,
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
      operationSystem,
    });
  }
}

export { Instance };
