import { permission as permissionRep } from '~/data/repositories/repositories';
import { EAMPermissionGetAllItemResponseDto } from '~/common/types/types';

type Constructor = {
  permissionRepository: typeof permissionRep;
};

class Permission {
  #permissionRepository: typeof permissionRep;

  constructor({ permissionRepository }: Constructor) {
    this.#permissionRepository = permissionRepository;
  }

  async getAll(): Promise<EAMPermissionGetAllItemResponseDto[]> {
    return this.#permissionRepository.getAll();
  }
}

export { Permission };
