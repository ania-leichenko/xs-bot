import { Model, RelationMappings } from 'objection';
import { TableName, InstanceState } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { OperationSystem as OperationSystemModel } from '../operation-system/operation-system.model';
import { InstanceTableField } from './instance-table-field.enum';
import { join } from 'path';
import { OperationSystem } from '~/common/types/types';

class Instance extends AbstractModel {
  [InstanceTableField.NAME]: string;
  [InstanceTableField.KEY_PAIRS_ID]: string;
  [InstanceTableField.USERNAME]: string;
  [InstanceTableField.HOSTNAME]: string | null;
  [InstanceTableField.OPERATION_SYSTEM_ID]: string;
  [InstanceTableField.CREATED_BY]: string;
  [InstanceTableField.AWS_INSTANCE_ID]: string;
  [InstanceTableField.TENANT_ID]: string;
  [InstanceTableField.STATE]: InstanceState;
  [InstanceTableField.OPERATION_SYSTEM]: OperationSystem;

  static get tableName(): string {
    return TableName.INSTANCES;
  }

  static get relationMappings(): RelationMappings {
    return {
      operationSystem: {
        relation: Model.HasOneRelation,
        modelClass: join(
          __dirname,
          '../operation-system/operation-system.model',
        ),
        filter: (query): void => {
          const { ref } = OperationSystemModel;
          query.select(ref('id'), ref('name'));
        },
        join: {
          from: `${TableName.INSTANCES}.operationSystemId`,
          to: `${TableName.OPERATION_SYSTEMS}.id`,
        },
      },
    };
  }
}

export { Instance };
