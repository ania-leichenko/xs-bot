import { Worker as WorkerM } from '~/data/models/models';
import { Worker as WorkerEntity } from '~/services/worker/worker.entity';

type Constructor = {
  WorkerModel: typeof WorkerM;
};

class Worker {
  #WorkerModel: typeof WorkerM;

  constructor({ WorkerModel }: Constructor) {
    this.#WorkerModel = WorkerModel;
  }

  async getAll(): Promise<WorkerEntity[]> {
    const workers = await this.#WorkerModel.query();
    return workers.map(Worker.modelToEntity);
  }

  public static modelToEntity(model: WorkerM): WorkerEntity {
    const { id, name, passwordHash, passwordSalt, tenantId } = model;

    return WorkerEntity.initialize({
      id,
      name,
      passwordHash,
      passwordSalt,
      createdAt: new Date(model.createdAt),
      tenantId,
    });
  }
}

export { Worker };
