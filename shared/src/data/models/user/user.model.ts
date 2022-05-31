//import { Model, RelationMappings } from 'objection';
//import { join } from 'path';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { UserTableField } from './user-table-field.enum';

class User extends AbstractModel {
  [UserTableField.CHAT_ID]: number;
  [UserTableField.FIRST_NAME]: string;
  [UserTableField.USERNAME]: string;
  [UserTableField.ADMIN]: number;
  [UserTableField.JOINED]: Date;
  [UserTableField.LAST_ACTION]: Date;
  [UserTableField.COUNT_OF_SUBSCRIPTION]: number;

  static get idColumn(): string {
    return UserTableField.CHAT_ID;
  }

  static get tableName(): string {
    return TableName.USERS;
  }
}

export { User };
