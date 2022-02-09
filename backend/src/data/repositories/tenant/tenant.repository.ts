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

  async create(Tenant: TenantEntity): Promise<TenantM> {
    return this.#TenantModel.query().insert({
      id: Tenant.id,
      name: Tenant.name,
      createdAt: Tenant.createdAt.toISOString(),
    });
  }

  public static modelToEntity(model: TenantM): TenantEntity {
    return TenantEntity.initialize({
      id: model.id,
      name: model.name,
      createdAt: new Date(model.createdAt),
    });
  }
}

export { Tenant };
