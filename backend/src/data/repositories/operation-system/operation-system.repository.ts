import { OperationSystem as OperationSystemM } from '~/data/models/models';

type Constructor = {
  OperationSystemModel: typeof OperationSystemM;
};

class OperationSystem {
  #OperationSystemModel: typeof OperationSystemM;

  constructor({ OperationSystemModel }: Constructor) {
    this.#OperationSystemModel = OperationSystemModel;
  }

  async getById(id: string): Promise<{
    id: string;
    name: string;
    createdAt: string;
    awsGenerationName: string;
  } | null> {
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
