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

  public static modelToEntity(model: GroupM): GroupEntity {
    return GroupEntity.initialize({
      id: model.id,
      name: model.name,
      createdAt: new Date(model.createdAt),
      tenantId: model.tenantId,
    });
  }
}

export { Group };
