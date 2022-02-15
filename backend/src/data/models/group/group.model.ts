import { Model, RelationMappings } from 'objection';
import { join } from 'path';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import {
  Worker as WorkerModel,
  Permission as PermissionModel,
} from '~/data/models/models';
import { GroupTableField } from './group-table-field.enum';
import { EAMGroupRelatedItem } from '~/common/types/types';

class Group extends AbstractModel {
  [GroupTableField.NAME]: string;
  [GroupTableField.TENANT_ID]: string;
  [GroupTableField.USERS]: EAMGroupRelatedItem[];
  [GroupTableField.PERMISSIONS]: EAMGroupRelatedItem[];

  static get tableName(): string {
    return TableName.GROUPS;
  }

  static get relationMappings(): RelationMappings {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: join(__dirname, '../worker/worker.model'),
        filter: (query): void => {
          const { ref } = WorkerModel;
          query.select(ref('id'), ref('name'));
        },
        join: {
          from: `${TableName.GROUPS}.id`,
          through: {
            from: `${TableName.USERS_GROUPS}.groupId`,
            to: `${TableName.USERS_GROUPS}.userId`,
          },
          to: `${TableName.WORKERS}.id`,
        },
      },
      permissions: {
        relation: Model.ManyToManyRelation,
        modelClass: join(__dirname, '../permission/permission.model'),
        filter: (query): void => {
          const { ref } = PermissionModel;
          query.select(ref('id'), ref('name'));
        },
        join: {
          from: `${TableName.GROUPS}.id`,
          through: {
            from: `${TableName.GROUPS_PERMISSIONS}.groupId`,
            to: `${TableName.GROUPS_PERMISSIONS}.permissionId`,
          },
          to: `${TableName.PERMISSIONS}.id`,
        },
      },
    };
  }
}

export { Group };
