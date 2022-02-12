import { group as groupRep } from '~/data/repositories/repositories';
import {
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  EAMGroupGetRequestDto,
  EAMGroupGetResponseDto,
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

  public getGroupsByTenant(
    filter: EAMGroupGetRequestDto,
  ): Promise<EAMGroupGetResponseDto[] | []> {
    return this.#groupRepository.getGroupsByTenant(filter);
  }

  public async create({
    name,
    tenantId,
  }: EAMGroupCreateRequestDto): Promise<EAMGroupCreateResponseDto> {
    const groupByName = await this.#groupRepository.getGroupByNameAndTenant(
      name,
      tenantId,
    );
    if (groupByName) {
      throw new InvalidGroupNameError();
    }

    const group = GroupEntity.createNew({ name, tenantId });

    return this.#groupRepository.create(group);
  }
}

export { Group };
