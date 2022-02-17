import { Model, RelationMappings } from 'objection';
import { join } from 'path';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { Permission as PermissionModel } from '~/data/models/models';
import { MasterTableField } from './master-table-field.enum';
import { EAMMasterPermissionsItem } from '~/common/types/types';

class Master extends AbstractModel {
  [MasterTableField.NAME]: string;
  [MasterTableField.EMAIL]: string;
  [MasterTableField.PASSWORD_HASH]: string;
  [MasterTableField.PASSWORD_SALT]: string;
  [MasterTableField.TENANT_ID]: string;
  [MasterTableField.PERMISSIONS]: EAMMasterPermissionsItem[];

  static get tableName(): string {
    return TableName.MASTERS;
  }

  static get relationMappings(): RelationMappings {
    return {
      permissions: {
        relation: Model.HasManyRelation,
        modelClass: join(__dirname, '../permission/permission.model'),
        filter: (query): void => {
          const { ref } = PermissionModel;
          query.select(ref('id'), ref('name'));
        },
        join: {
          from: `${TableName.MASTERS}.id`,
          to: `${TableName.PERMISSIONS}.id`,
        },
      },
    };
  }
}

export { Master };
