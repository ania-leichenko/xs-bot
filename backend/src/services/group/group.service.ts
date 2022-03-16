import { group as groupRep } from '~/data/repositories/repositories';
import {
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
  EamGroupGetByIdResponseDto,
} from '~/common/types/types';
import { Group as GroupEntity } from '~/services/group/group.entity';
import { InvalidGroupNameError } from '~/exceptions/exceptions';

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
    permissionsIds,
  }: EAMGroupCreateRequestDto): Promise<EAMGroupCreateResponseDto> {
    const groupByName = await this.#groupRepository.getGroupByNameAndTenant(
      name,
      tenantId,
    );
    if (groupByName) {
      throw new InvalidGroupNameError();
    }

    const group = GroupEntity.createNew({
      name,
      tenantId,
      workersIds,
      permissionsIds,
    });

    const newGroup = await this.#groupRepository.create(group);

    return newGroup;
  }

  public async update(
    id: string,
    { name, tenantId, workersIds, permissionsIds }: EAMGroupCreateRequestDto,
  ): Promise<EAMGroupCreateResponseDto | null> {
    const group = await this.#groupRepository.getGroupById(id);

    if (!group) {
      return null;
    }
    if (name && name != group.name) {
      const groupByName = await this.#groupRepository.getGroupByNameAndTenant(
        name,
        tenantId,
      );

      if (groupByName) {
        throw new InvalidGroupNameError();
      }

      group.setName(name);
    }

    group.setWorkersIds(workersIds);
    group.setPermissionsIds(permissionsIds);

    await this.#groupRepository.save(group);

    return group;
  }

  public async getGroupById(
    id: string,
  ): Promise<EamGroupGetByIdResponseDto | null> {
    const group = await this.#groupRepository.getGroupById(id);
    return group;
  }
}

export { Group };
