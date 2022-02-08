import { GroupDto } from '~/common/types/types';
import { group as groupRep } from '~/data/repositories/repositories';
// import { Group as GroupEntity } from "~/services/group/group.entity";

type Constructor = {
  groupRepository: typeof groupRep;
};

class Group {
  #groupRepository: typeof groupRep;

  constructor({ groupRepository }: Constructor) {
    this.#groupRepository = groupRepository;
  }

  async getAll(): Promise<GroupDto[]> {
    const groups = await this.#groupRepository.getAll();

    return groups.map((g) => ({
      id: g.id,
      name: g.name,
      createdAt: g.createdAt,
      tenant_id: g.tenant_id,
    }));
  }
}

export { Group };
