import { Function as FunctionM } from '~/data/models/models';
import { SLC as FunctionEntity } from '~/services/function/function.entity';

type Constructor = {
  FunctionModel: typeof FunctionM;
};

class Function {
  #FunctionModel: typeof FunctionM;

  constructor({ FunctionModel }: Constructor) {
    this.#FunctionModel = FunctionModel;
  }

  async getByName(
    createdBy: string,
    name: string,
  ): Promise<FunctionEntity | null> {
    const slc = await this.#FunctionModel
      .query()
      .select()
      .where({ createdBy })
      .andWhere({ name })
      .first();

    if (!slc) {
      return null;
    }

    return Function.modelToEntity(slc);
  }

  async create(slc: FunctionEntity): Promise<FunctionEntity> {
    const {
      id,
      name,
      createdAt,
      sourceCode,
      createdBy,
      awsLambdaId,
      updatedAt,
    } = slc;

    return this.#FunctionModel.query().insert({
      id,
      name,
      createdAt,
      sourceCode,
      createdBy,
      awsLambdaId,
      updatedAt,
    });
  }

  public static modelToEntity(model: FunctionM): FunctionEntity {
    const {
      id,
      name,
      createdAt,
      sourceCode,
      createdBy,
      awsLambdaId,
      updatedAt,
    } = model;

    return FunctionEntity.initialize({
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

export { Function };
