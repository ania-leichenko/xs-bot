import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { PermissionTableField } from './permission-table-field.enum';

class Permission extends AbstractModel {
  [PermissionTableField.NAME]: string;

  static get tableName(): string {
    return TableName.PERMISSIONS;
  }
}

export { Permission };
