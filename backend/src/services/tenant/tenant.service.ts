import { getRandomId as getRandomName } from 'bws-shared';
import { TenantResponseDto } from '~/common/types/types';
import { tenantRepository as TenantRepository } from '~/data/repositories/repositories';
import { Tenant as TenantEntity } from './tenant.entity';

type Constructor = {
  tenantRepository: typeof TenantRepository;
};

class TenantService {
  #tenantRepository: typeof TenantRepository;

  constructor({ tenantRepository }: Constructor) {
    this.#tenantRepository = tenantRepository;
  }

  async create(): Promise<TenantResponseDto> {
    const tenant = TenantEntity.createNew({ name: getRandomName() });
    return await this.#tenantRepository.create(tenant);
  }
}

export { TenantService };
