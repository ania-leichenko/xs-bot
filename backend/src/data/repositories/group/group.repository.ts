import {
  Group as GroupM,
  UsersGroups as UsersGroupsM,
  GroupsPermissions as GroupsPermissionsM,
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
  GroupsPermissionsModel: typeof GroupsPermissionsM;
};

class Group {
  #GroupModel: typeof GroupM;
  #UsersGroupsModel: typeof UsersGroupsM;
  #GroupsPermissionsModel: typeof GroupsPermissionsM;

  constructor({
    GroupModel,
    UsersGroupsModel,
    GroupsPermissionsModel,
  }: Constructor) {
    this.#GroupModel = GroupModel;
    this.#UsersGroupsModel = UsersGroupsModel;
    this.#GroupsPermissionsModel = GroupsPermissionsModel;
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

    const workerIds = await this.getGroupWorkersById(group.id);
    const permissionIds = await this.getGroupPermissionsById(group.id);

    return Group.modelToEntity(group, workerIds, permissionIds);
  }

  async getGroupWorkersById(id: string): Promise<string[]> {
    const worker = await this.#UsersGroupsModel
      .query()
      .select('userId')
      .where({ groupId: id });
    return worker.map((item) => item.userId);
  }

  async getGroupPermissionsById(id: string): Promise<string[]> {
    const permissions = await this.#GroupsPermissionsModel
      .query()
      .select('permissionId')
      .where({ groupId: id });
    return permissions.map((item) => item.permissionId);
  }

  async getGroupById(id: string): Promise<GroupEntity | null> {
    const group = await this.#GroupModel.query().select().where({ id }).first();

    if (!group) {
      return null;
    }
    const permissionIds = await this.getGroupPermissionsById(id);
    return Group.modelToEntity(group, [], permissionIds);
  }

  async insertWorkerByIdGroup(id: string, workerIds: string[]): Promise<void> {
    const hasWorkersIds = Boolean(workerIds.length);
    if (hasWorkersIds) {
      await this.#UsersGroupsModel.query().insert(
        workerIds.map((workerId) => ({
          id: getRandomId(),
          userId: workerId,
          groupId: id,
          createdAt: new Date().toISOString(),
        })),
      );
    }
  }

  async insertPermissionsByIdGroup(
    id: string,
    permissionIds: string[],
  ): Promise<void> {
    await this.#GroupsPermissionsModel.query().insert(
      permissionIds.map((permissionId) => ({
        id: getRandomId(),
        groupId: id,
        permissionId: permissionId,
        createdAt: new Date().toISOString(),
      })),
    );
  }

  async create(group: GroupEntity): Promise<GroupEntity> {
    const { id, name, tenantId, createdAt, workersIds, permissionsIds } = group;

    const created = await this.#GroupModel.query().insert({
      id,
      name,
      createdAt: createdAt,
      tenantId,
    });

    await this.insertWorkerByIdGroup(id, workersIds);
    await this.insertPermissionsByIdGroup(id, permissionsIds);

    return Group.modelToEntity(created, workersIds, permissionsIds);
  }

  public async save(group: GroupEntity): Promise<GroupEntity | null> {
    const { id, name, workersIds, permissionsIds } = group;
    const groupModel = await this.#GroupModel
      .query()
      .patchAndFetchById(id, { name });
    if (!groupModel) {
      return null;
    }

    await this.#GroupsPermissionsModel
      .query()
      .delete()
      .where({ 'groupId': id });
    await this.#UsersGroupsModel.query().delete().where({ 'groupId': id });

    await this.insertWorkerByIdGroup(id, workersIds);
    await this.insertPermissionsByIdGroup(id, permissionsIds);

    return Group.modelToEntity(groupModel, workersIds, permissionsIds);
  }

  public static modelToEntity(
    model: GroupM,
    workersIds: string[],
    permissionsIds: string[],
  ): GroupEntity {
    return GroupEntity.initialize({
      id: model.id,
      name: model.name,
      createdAt: model.createdAt,
      tenantId: model.tenantId,
      workersIds: workersIds,
      permissionsIds: permissionsIds,
    });
  }
}

export { Group };
