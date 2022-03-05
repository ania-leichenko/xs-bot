import { Tenant as TenantM } from '~/data/models/models';
import { Tenant as TenantEntity } from '~/services/tenant/tenant.entity';

type Constructor = {
  TenantModel: typeof TenantM;
};

class Tenant {
  #TenantModel: typeof TenantM;

  constructor({ TenantModel }: Constructor) {
    this.#TenantModel = TenantModel;
  }

  async getById(id: string): Promise<TenantEntity | null> {
    const tenant = await this.#TenantModel
      .query()
      .select()
      .where({ id })
      .first();

    if (!tenant) {
      return null;
    }

    return Tenant.modelToEntity(tenant);
  }

  async save(tenant: TenantEntity): Promise<TenantEntity | null> {
    const { id, name } = tenant;
    const tenantModel = await this.#TenantModel
      .query()
      .patchAndFetchById(id, { name });
    if (!tenantModel) {
      return null;
    }

    return Tenant.modelToEntity(tenantModel);
  }

  async create(tenant: TenantEntity): Promise<TenantM> {
    const { id, name } = tenant;

    return this.#TenantModel.query().insert({
      id,
      name,
      createdAt: tenant.createdAt.toISOString(),
    });
  }

  async getByName(name: string): Promise<TenantEntity | null> {
    const tenant = await this.#TenantModel
      .query()
      .select()
      .where({ name })
      .first();

    if (!tenant) {
      return null;
    }

    return Tenant.modelToEntity(tenant);
  }

  public static modelToEntity(model: TenantM): TenantEntity {
    const { id, name } = model;

    return TenantEntity.initialize({
      id,
      name,
      createdAt: new Date(model.createdAt),
    });
  }
}

export { Tenant };
