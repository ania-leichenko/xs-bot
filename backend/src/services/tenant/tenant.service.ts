import { TenantDto } from '~/common/types/types';
import { tenant as tenantRep } from '~/data/repositories/repositories';
import { Tenant as TenantEntity } from './tenant.entity';

type Constructor = {
  tenantRepository: typeof tenantRep;
};

class Tenant {
  #tenantRepository: typeof tenantRep;

  constructor({ tenantRepository }: Constructor) {
    this.#tenantRepository = tenantRepository;
  }

  async getAll(): Promise<TenantDto[]> {
    const tenants = await this.#tenantRepository.getAll();

    return tenants.map((t) => ({
      id: t.id,
      name: t.name,
    }));
  }

  async create(): Promise<TenantDto> {
    const tenant = TenantEntity.createNew();
    return await this.#tenantRepository.create(tenant);
  }
}

export { Tenant };
