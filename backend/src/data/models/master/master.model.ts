import { MasterTableField } from './master-table-field.enum';
import { TableName } from '../../common/table-name.enum';
import { AbstractModel } from '../abstract/abstract.model';

class MasterModel extends AbstractModel {
  [MasterTableField.EMAIL]: string;
  [MasterTableField.NAME]: string;
  [MasterTableField.PASSWORD_HASH]: string;
  [MasterTableField.PASSWORD_SALT]: string;

  static get tableName(): string {
    return TableName.MASTERS;
  }
}

export { MasterModel };
