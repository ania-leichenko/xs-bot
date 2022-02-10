import { Worker as WorkerM } from '~/data/models/models';

type Constructor = {
  WorkerModel: typeof WorkerM;
};

class Worker {
  #WorkerModel: typeof WorkerM;

  constructor({ WorkerModel }: Constructor) {
    this.#WorkerModel = WorkerModel;
  }
}

export { Worker };
