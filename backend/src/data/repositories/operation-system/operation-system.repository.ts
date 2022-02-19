import { OperationSystem as OperationSystemM } from '~/data/models/operation-system/operation-system.model';

type Constructor = {
  OperationSystemModel: typeof OperationSystemM;
};

type OperationSystemEntity = {
  id: string;
  name: string;
  createdAt: string;
  awsGenerationName: string;
};

class OperationSystem {
  #OperationSystemModel: typeof OperationSystemM;

  constructor({ OperationSystemModel }: Constructor) {
    this.#OperationSystemModel = OperationSystemModel;
  }

  async getById(id: string): Promise<OperationSystemEntity | null> {
    const operationSystem = await this.#OperationSystemModel
      .query()
      .select()
      .where({ id })
      .first();

    if (!operationSystem) {
      return null;
    }

    return operationSystem;
  }
}

export { OperationSystem };
