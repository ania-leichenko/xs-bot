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

  public async create(worker: WorkerEntity): Promise<WorkerM> {
    const { id, name, passwordHash, passwordSalt, tenantId } = worker;

    return this.#WorkerModel.query().insert({
      id,
      name,
      passwordHash,
      passwordSalt,
      createdAt: worker.createdAt.toISOString(),
      tenantId,
    });
  }
}

export { Worker };
