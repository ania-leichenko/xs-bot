import { OperationSystem as OperationSystemM } from '~/data/models/models';
import { OperationSystem as OperationSystemEntity } from '~/services/operation-system/operation-system.entity';

type Constructor = {
  OperationSystemModel: typeof OperationSystemM;
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

    return OperationSystem.modelToEntity(operationSystem);
  }

  async getAll(): Promise<OperationSystemEntity[]> {
    const operationSystems = await this.#OperationSystemModel
      .query()
      .select()
      .orderBy('createdAt', 'desc');

    return operationSystems.map(OperationSystem.modelToEntity);
  }

  public static modelToEntity(model: OperationSystemM): OperationSystemEntity {
    const { id, name, createdAt, awsGenerationName } = model;

    return OperationSystemEntity.initialize({
      id,
      name,
      createdAt,
      awsGenerationName,
    });
  }
}

export { OperationSystem };
