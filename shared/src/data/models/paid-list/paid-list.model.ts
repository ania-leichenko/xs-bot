//import { Model, RelationMappings } from 'objection';
//import { join } from 'path';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { PaidListTableField } from './paid-list-table-field.enum';

class PaidList extends AbstractModel {
  [PaidListTableField.TICKET]: number;
  [PaidListTableField.CHAT_ID]: number;
  [PaidListTableField.FIRST_NAME]: string;
  [PaidListTableField.USERNAME]: string;
  [PaidListTableField.SUBCRIPTION_TIME]: Date;
  [PaidListTableField.PLAN]: string;
  [PaidListTableField.PAYMENT_METHOD]: string;
  [PaidListTableField.STATUS]: string;
  [PaidListTableField.COUNTRY]: string;

  static get idColumn(): string {
    return PaidListTableField.TICKET;
  }

  static get tableName(): string {
    return TableName.PAID_LIST;
  }
}

export { PaidList };
