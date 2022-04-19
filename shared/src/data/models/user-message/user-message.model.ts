//import { Model, RelationMappings } from 'objection';
//import { join } from 'path';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { UserMessageTableField } from './user-message-table-field.enum';

class UserMessage extends AbstractModel {
  [UserMessageTableField.CHAT_ID]: number;
  [UserMessageTableField.TEXT]: string;
  [UserMessageTableField.DATE]: Date;

  static get idColumn(): string {
    return UserMessageTableField.CHAT_ID;
  }

  static get tableName(): string {
    return TableName.MESSAGE_FROM_USER;
  }
}

export { UserMessage };
