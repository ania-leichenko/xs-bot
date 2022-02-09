import { getRandomId as getRandomName } from 'bws-shared';
import { TenantResponseDto } from '~/common/types/types';
import { tenant as TenantRep } from '~/data/repositories/repositories';
import { Tenant as TenantEntity } from './tenant.entity';

type Constructor = {
  tenantRepository: typeof TenantRep;
};

class Tenant {
  #tenantRepository: typeof TenantRep;

  constructor({ tenantRepository }: Constructor) {
    this.#tenantRepository = tenantRepository;
  }

  async create(): Promise<TenantResponseDto> {
    const tenant = TenantEntity.createNew({ name: getRandomName() });
    return await this.#tenantRepository.create(tenant);
  }
}

export { Tenant };
