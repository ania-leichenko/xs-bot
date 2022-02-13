import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { WorkerTableField } from './worker-table-field.enum';

class Worker extends AbstractModel {
  [WorkerTableField.NAME]: string;
  [WorkerTableField.PASSWORD_HASH]: string;
  [WorkerTableField.PASSWORD_SALT]: string;
  [WorkerTableField.TENANT_ID]: string;

  static get tableName(): string {
    return TableName.WORKERS;
  }
}

export { Worker };
