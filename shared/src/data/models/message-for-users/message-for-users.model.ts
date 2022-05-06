//import { Model, RelationMappings } from 'objection';
//import { join } from 'path';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { MessageForUsersTableField } from './message-for-users-table-field.enum';

class MessageForUsers extends AbstractModel {
  [MessageForUsersTableField.CHAT_ID]: number;
  [MessageForUsersTableField.MESSAGE]: string;

  static get idColumn(): string {
    return MessageForUsersTableField.CHAT_ID;
  }

  static get tableName(): string {
    return TableName.MESSAGE_FOR_USERS;
  }
}

export { MessageForUsers };
