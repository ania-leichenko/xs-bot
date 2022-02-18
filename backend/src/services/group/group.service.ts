import { group as groupRep } from '~/data/repositories/repositories';
import {
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
} from '~/common/types/types';
import { Group as GroupEntity } from '~/services/group/group.entity';
import {
  InvalidGroupNameError,
  PermissionSelectError,
} from '~/exceptions/exceptions';

type Constructor = {
  groupRepository: typeof groupRep;
};

class Group {
  #groupRepository: typeof groupRep;

  constructor({ groupRepository }: Constructor) {
    this.#groupRepository = groupRepository;
  }

  public async getGroupsByTenant(
    filter: EAMGroupGetByTenantRequestParamsDto,
  ): Promise<EAMGroupGetByTenantResponseDto> {
    const groups = await this.#groupRepository.getGroupsByTenant(filter);
    return { items: groups };
  }

  public async create({
    name,
    tenantId,
    workersIds,
    permissionIds,
  }: EAMGroupCreateRequestDto): Promise<EAMGroupCreateResponseDto> {
    const groupByName = await this.#groupRepository.getGroupByNameAndTenant(
      name,
      tenantId,
    );
    if (groupByName) {
      throw new InvalidGroupNameError();
    }
    if (!permissionIds) {
      throw new PermissionSelectError();
    }

    const group = GroupEntity.createNew({
      name,
      tenantId,
      workersIds,
      permissionIds,
    });

    const newGroup = await this.#groupRepository.create(group);

    return newGroup;
  }
}

export { Group };
