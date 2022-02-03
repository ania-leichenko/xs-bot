import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { MasterTableField } from './master-table-field.enum';

class Master extends AbstractModel {
  [MasterTableField.EMAIL]: string;
  [MasterTableField.NAME]: string;
  [MasterTableField.PASSWORD_HASH]: string;
  [MasterTableField.PASSWORD_SALT]: string;

  static get tableName(): string {
    return TableName.MASTERS;
  }
}

export { Master };
