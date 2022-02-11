import { group as groupRep } from '~/data/repositories/repositories';
import {
  EAMGroupCreateRequestDto,
  EAMGroupResponseDto,
} from '~/common/types/types';
import { Group as GroupEntity } from '~/services/group/group.entity';

type Constructor = {
  groupRepository: typeof groupRep;
};

class Group {
  #groupRepository: typeof groupRep;

  constructor({ groupRepository }: Constructor) {
    this.#groupRepository = groupRepository;
  }

  public async create({
    name,
    tenantId,
  }: EAMGroupCreateRequestDto): Promise<EAMGroupResponseDto> {
    const groupByName = await this.#groupRepository.getGroupByNameAndTenant(
      name,
      tenantId,
    );
    if (groupByName) {
      // throw new error
    }

    const group = GroupEntity.createNew({ name, tenantId });

    await this.#groupRepository.create(group);

    return group;
  }
}

export { Group };
