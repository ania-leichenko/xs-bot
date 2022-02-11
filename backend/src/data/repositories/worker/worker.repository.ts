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

  public async getAll(): Promise<Array<WorkerM>> {
    return this.#WorkerModel.query().select('*');
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

  public static modelToEntity(model: WorkerM): WorkerEntity {
    const { id, name, passwordHash, passwordSalt, tenantId } = model;

    return WorkerEntity.initialize({
      id,
      name,
      passwordHash,
      passwordSalt,
      tenantId,
      createdAt: new Date(model.createdAt),
    });
  }
}

export { Worker };
