import { SLCFunction as SLCFunctionM } from '~/data/models/models';
import { SLCFunction as SLCFunctionEntity } from '~/services/slc-function/slc-function.entity';
import {
  SLCFunctionGetFilter,
  SLCFunctionGetResponseItemDto,
} from '~/common/types/types';
import { TableName } from '~/common/enums/enums';
import { FunctionTableField } from '~/data/models/slc-function/slc-function-table-field.enum';
import { AbstractTableField } from '~/data/models/abstract/abstract-table-field.enum';

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

  async getAllByTenant(
    filter: SLCFunctionGetFilter,
  ): Promise<SLCFunctionGetResponseItemDto[]> {
    const { from: offset, count: limit, tenantId } = filter;

    const slcFunctions = await this.#SLCFunctionModel
      .query()
      .select(
        `${TableName.FUNCTIONS}.${FunctionTableField.NAME}`,
        `${TableName.FUNCTIONS}.${FunctionTableField.UPDATED_AT}`,
      )
      .join(
        TableName.WORKERS,
        `${FunctionTableField.CREATED_BY}`,
        `${TableName.WORKERS}.${AbstractTableField.ID}`,
      )
      .where({ tenantId })
      .orderBy(`${FunctionTableField.UPDATED_AT}`, 'desc')
      .offset(offset)
      .limit(limit);

    return slcFunctions.map((slcFunction) => {
      return {
        name: slcFunction.name,
        updatedAt: slcFunction.updatedAt,
      };
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
