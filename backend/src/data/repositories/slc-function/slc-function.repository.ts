import { SLCFunction as SLCFunctionM } from '~/data/models/models';
import { SLCFunction as SLCFunctionEntity } from '~/services/slc-function/slc-function.entity';

type Constructor = {
  SLCFunctionModel: typeof SLCFunctionM;
};

class SLCFunction {
  #SLCFunctionModel: typeof SLCFunctionM;

  constructor({ SLCFunctionModel }: Constructor) {
    this.#SLCFunctionModel = SLCFunctionModel;
  }

  async getByName(name: string): Promise<SLCFunctionEntity | null> {
    const slcFunction = await this.#SLCFunctionModel
      .query()
      .select()
      .where({ name })
      .first();

    if (!slcFunction) {
      return null;
    }

    return SLCFunction.modelToEntity(slcFunction);
  }

  async create(slcFunction: SLCFunctionEntity): Promise<SLCFunctionEntity> {
    const {
      id,
      name,
      createdAt,
      sourceCode,
      createdBy,
      awsLambdaId,
      updatedAt,
    } = slcFunction;

    return this.#SLCFunctionModel.query().insert({
      id,
      name,
      createdAt,
      sourceCode,
      createdBy,
      awsLambdaId,
      updatedAt,
    });
  }

  public static modelToEntity(model: SLCFunctionM): SLCFunctionEntity {
    const {
      id,
      name,
      createdAt,
      sourceCode,
      createdBy,
      awsLambdaId,
      updatedAt,
    } = model;

    return SLCFunctionEntity.initialize({
      id,
      name,
      createdAt,
      sourceCode,
      createdBy,
      awsLambdaId,
      updatedAt,
    });
  }
}

export { SLCFunction };