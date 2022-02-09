import { getRandomId as getRandomName } from 'bws-shared';
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

  async create(): Promise<TenantDto> {
    const tenant = TenantEntity.createNew({ name: getRandomName() });
    return await this.#tenantRepository.create(tenant);
  }
}

export { Tenant };
