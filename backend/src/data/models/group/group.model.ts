import { Model, RelationMappings } from 'objection';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import {
  Worker as WorkerModel,
  Permission as PermissionModel,
} from '~/data/models/models';
import { GroupTableField } from './group-table-field.enum';

class Group extends AbstractModel {
  [GroupTableField.NAME]: string;
  [GroupTableField.TENANT_ID]: string;

  static get tableName(): string {
    return TableName.GROUPS;
  }

  static get relationMappings(): RelationMappings {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: WorkerModel,
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
        modelClass: PermissionModel,
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
