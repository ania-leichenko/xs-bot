import {
  Group as GroupM,
  UsersGroups as UsersGroupsM,
} from '~/data/models/models';
import { Group as GroupEntity } from '~/services/group/group.entity';
import {
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseItemDto,
} from '~/common/types/types';
import { getRandomId } from '~/helpers/helpers';

type Constructor = {
  GroupModel: typeof GroupM;
  UsersGroupsModel: typeof UsersGroupsM;
};

class Group {
  #GroupModel: typeof GroupM;
  #UsersGroupsModel: typeof UsersGroupsM;

  constructor({ GroupModel, UsersGroupsModel }: Constructor) {
    this.#GroupModel = GroupModel;
    this.#UsersGroupsModel = UsersGroupsModel;
  }

  async getGroupsByTenant(
    filter: EAMGroupGetByTenantRequestParamsDto,
  ): Promise<EAMGroupGetByTenantResponseItemDto[]> {
    const { from: offset, count: limit, tenantId } = filter;
    return this.#GroupModel
      .query()
      .select('id', 'name', 'createdAt')
      .where({ tenantId })
      .withGraphFetched('[users, permissions]')
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit);
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

    return Group.modelToEntity(group, ['']);
  }

  async create(group: GroupEntity): Promise<GroupEntity> {
    const { id, name, tenantId, createdAt, workersIds } = group;

    const created = await this.#GroupModel.query().insert({
      id,
      name,
      createdAt: createdAt,
      tenantId,
    });
    const hasWorkersIds = Boolean(workersIds.length);
    if (hasWorkersIds) {
      await this.#UsersGroupsModel.query().insert(
        workersIds.map((workerId) => ({
          id: getRandomId(),
          userId: workerId,
          groupId: id,
          createdAt: createdAt,
        })),
      );
    }

    return Group.modelToEntity(created, workersIds);
  }

  public static modelToEntity(
    model: GroupM,
    workersIds: string[],
  ): GroupEntity {
    return GroupEntity.initialize({
      id: model.id,
      name: model.name,
      createdAt: model.createdAt,
      tenantId: model.tenantId,
      workersIds: workersIds,
    });
  }
}

export { Group };
