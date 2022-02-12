import {
  Worker as WorkerM,
  UsersGroups as UsersGroupsM,
} from '~/data/models/models';
import { Worker as WorkerEntity } from '~/services/worker/worker.entity';
import { getRandomId } from '~/helpers/helpers';

type Constructor = {
  WorkerModel: typeof WorkerM;
  UsersGroupsModel: typeof UsersGroupsM;
};

class Worker {
  #WorkerModel: typeof WorkerM;
  #UsersGroupsModel: typeof UsersGroupsM;

  constructor({ WorkerModel, UsersGroupsModel }: Constructor) {
    this.#WorkerModel = WorkerModel;
    this.#UsersGroupsModel = UsersGroupsModel;
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

    return Worker.modelToEntity(worker);
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

    groupIds.map(async (groupId) => {
      await this.#UsersGroupsModel.query().insert({
        id: getRandomId(),
        userId: id,
        groupId: groupId,
        createdAt: worker.createdAt.toISOString(),
      });
    });

    return Worker.modelToEntity(newWorker);
  }

  public static modelToEntity(model: WorkerM): WorkerEntity {
    const { id, name, passwordHash, passwordSalt, tenantId } = model;

    const groupIds: string[] = []; // how get group ids?

    return WorkerEntity.initialize({
      id,
      name,
      passwordHash,
      passwordSalt,
      tenantId,
      groupIds,
      createdAt: new Date(model.createdAt),
    });
  }
}

export { Worker };
