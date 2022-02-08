import { Group as GroupM } from '~/data/models/models';
import { Group as GroupEntity } from '~/services/group/group.entity';

type Constructor = {
  GroupModel: typeof GroupM;
};

class Group {
  #GroupModel: typeof GroupM;

  constructor({ GroupModel }: Constructor) {
    this.#GroupModel = GroupModel;
  }

  async getAll(): Promise<GroupEntity[]> {
    const groups = await this.#GroupModel.query();
    return groups.map(Group.modelToEntity);
  }

  async getByName(name: string): Promise<GroupEntity | null> {
    const group = await this.#GroupModel
      .query()
      .select()
      .where({ name })
      .first();
    if (!group) {
      return null;
    }

    return Group.modelToEntity(group);
  }

  async create({ group }: { group: GroupM }): Promise<GroupM> {
    return this.#GroupModel.query().insert({
      id: group.id,
      name: group.name,
      createdAt: group.createdAt,
      tenant_id: group.tenant_id,
    });
  }

  public static modelToEntity(model: GroupM): GroupEntity {
    return GroupEntity.initialize({
      id: model.id,
      name: model.name,
      createdAt: new Date(model.createdAt),
      tenant_id: model.tenant_id,
    });
  }
}

export { Group };
