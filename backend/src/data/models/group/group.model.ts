import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { GroupTableField } from './group-table-field.enum';

class Group extends AbstractModel {
  [GroupTableField.NAME]: string;

  static get tableName(): string {
    return TableName.GROUPS;
  }
}

export { Group };
