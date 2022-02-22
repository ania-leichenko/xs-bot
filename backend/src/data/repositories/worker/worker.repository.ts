import {
  Worker as WorkerM,
  UsersGroups as UsersGroupsM,
  GroupsPermissions as GroupsPermissionsM,
} from '~/data/models/models';
import { Worker as WorkerEntity } from '~/services/worker/worker.entity';
import { getRandomId } from '~/helpers/helpers';
import {
  EAMWorkerGetAllItemResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
} from '~/common/types/types';

type Constructor = {
  WorkerModel: typeof WorkerM;
  UsersGroupsModel: typeof UsersGroupsM;
  GroupsPermissionsModel: typeof GroupsPermissionsM;
};

type UsersGroups = {
  groupId: string;
};

class Worker {
  #WorkerModel: typeof WorkerM;
  #UsersGroupsModel: typeof UsersGroupsM;
  #GroupsPermissionsModel: typeof GroupsPermissionsM;

  constructor({
    WorkerModel,
    UsersGroupsModel,
    GroupsPermissionsModel,
  }: Constructor) {
    this.#WorkerModel = WorkerModel;
    this.#UsersGroupsModel = UsersGroupsModel;
    this.#GroupsPermissionsModel = GroupsPermissionsModel;
  }

  public async getAll(
    param: EAMWorkerGetByTenantRequestParamsDto,
  ): Promise<EAMWorkerGetAllItemResponseDto[]> {
    const { from: offset, count: limit, tenantId } = param;

    const workers = await this.#WorkerModel
      .query()
      .select('id', 'name', 'createdAt')
      .where({ tenantId })
      .withGraphFetched('[groups]')
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(limit);

    await this.getWorkerPermissions(workers[0].id);

    return workers;
  }

  public async getWorkerPermissions(workerId: string): Promise<Array<string>> {
    type userGroups = {
      groupId: string;
    };
    const groups: userGroups[] = await this.#UsersGroupsModel
      .query()
      .select('groupId')
      .where({ 'userId': workerId });

    const groupsIds: string[] = groups.map((item): string => item.groupId);

    const permissions = await this.#GroupsPermissionsModel
      .query()
      .select('permissionId')
      .whereIn('groupId', groupsIds);

    const permissionIds = new Set<string>([]);

    permissions.map((item) => {
      permissionIds.add(item.permissionId);
      return item;
    });

    return Array.from(permissionIds);
  }

  public async getByName(name: string): Promise<WorkerEntity | null> {
    const worker = await this.#WorkerModel
      .query()
      .select()
      .where({ name })
      .first();

    if (!worker) {
      return null;
    }

    const groups: UsersGroups[] = await this.#UsersGroupsModel
      .query()
      .select('group_id')
      .where({ userId: worker.id });

    const groupIds: string[] = groups.map((group) => group.groupId);

    const permissions = await this.getWorkerPermissions(worker.id);

    return Worker.modelToEntity(worker, groupIds, permissions);
  }

  async getById(id: string): Promise<WorkerEntity | null> {
    const worker = await this.#WorkerModel
      .query()
      .select()
      .where({ id })
      .first();

    if (!worker) {
      return null;
    }

    const groups: UsersGroups[] = await this.#UsersGroupsModel
      .query()
      .select('group_id')
      .where({ userId: id });

    const groupIds: string[] = groups.map((group) => group.groupId);
    const permissions = await this.getWorkerPermissions(id);

    return Worker.modelToEntity(worker, groupIds, permissions);
  }

  public async create(worker: WorkerEntity): Promise<WorkerEntity> {
    const { id, name, passwordHash, passwordSalt, tenantId, groupIds } = worker;

    const newWorker = await this.#WorkerModel.query().insert({
      id,
      name,
      passwordHash,
      passwordSalt,
      createdAt: worker.createdAt.toISOString(),
      tenantId,
    });

    const hasGroupsIds = Boolean(groupIds.length);

    if (hasGroupsIds) {
      await this.#UsersGroupsModel.query().insert(
        groupIds.map((groupId) => ({
          id: getRandomId(),
          userId: id,
          groupId: groupId,
          createdAt: worker.createdAt.toISOString(),
        })),
      );
    }

    const permissions = await this.getWorkerPermissions(id);

    return Worker.modelToEntity(newWorker, groupIds, permissions);
  }

  public static modelToEntity(
    model: WorkerM,
    groupIds: string[],
    permissions: string[],
  ): WorkerEntity {
    const { id, name, passwordHash, passwordSalt, tenantId } = model;

    return WorkerEntity.initialize({
      id,
      name,
      passwordHash,
      passwordSalt,
      tenantId,
      groupIds,
      permissions,
      createdAt: new Date(model.createdAt),
    });
  }
}

export { Worker };
