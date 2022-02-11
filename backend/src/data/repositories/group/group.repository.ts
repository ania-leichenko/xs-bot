import { Group as GroupM } from '~/data/models/models';
import { Group as GroupEntity } from '~/services/group/group.entity';
import { TableName } from '~/common/enums/db/table-name.enum';

type Constructor = {
  GroupModel: typeof GroupM;
};

class Group {
  #GroupModel: typeof GroupM;

  constructor({ GroupModel }: Constructor) {
    this.#GroupModel = GroupModel;
  }

  async getGroupByNameAndTenant(
    name: string,
    tenantId: string,
  ): Promise<GroupEntity | null> {
    const group = await this.#GroupModel
      .query()
      .select()
      .where({ name })
      .andWhere({ tenantId })
      .first();

    if (!group) {
      return null;
    }

    return Group.modelToEntity(group);
  }
  //
  async getUsersOfGroup(
    name: string,
    tenantId: string,
  ): Promise<{ name: string }[] | null> {
    return this.#GroupModel
      .query()
      .select(`${TableName.GROUPS}`)
      .join(`${TableName.USERS_GROUPS}`, 'group_id', `${TableName.GROUPS}.id`)
      .join(`${TableName.WORKERS}`, 'id', `${TableName.USERS_GROUPS}.user_id`)
      .select(`${TableName.GROUPS}.name`)
      .where({ name: name })
      .andWhere({ tenant_id: tenantId })
      .select(`${TableName.WORKERS}.name`);
  }

  async create(group: GroupEntity): Promise<GroupM> {
    const { id, name, tenantId } = group;

    return this.#GroupModel.query().insert({
      id,
      name,
      createdAt: group.createdAt.toISOString(),
      tenantId,
    });
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
