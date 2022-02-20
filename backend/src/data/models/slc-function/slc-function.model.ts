import { TableName } from '~/common/enums/enums';
import { getFormattedISODate } from '~/helpers/helpers';
import { AbstractModel } from '../abstract/abstract.model';
import { FunctionTableField } from './slc-function-table-field.enum';

class SLCFunction extends AbstractModel {
  [FunctionTableField.NAME]: string;
  [FunctionTableField.SOURCE_CODE]: string;
  [FunctionTableField.CREATED_BY]: string;
  [FunctionTableField.AWS_LAMBDA_ID]: string;
  [FunctionTableField.UPDATED_AT]: string;

  $beforeInsert(): void {
    const date = getFormattedISODate(new Date());
    this.createdAt = date;
    this.updatedAt = date;
  }

  static get tableName(): string {
    return TableName.FUNCTIONS;
  }
}

export { SLCFunction };
