//import { Model, RelationMappings } from 'objection';
//import { join } from 'path';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { MessageFromBotTableField } from './message-from-bot-table-field.enum';

class MessageFromBot extends AbstractModel {
  [MessageFromBotTableField.CHAT_ID]: number;

  static get idColumn(): string {
    return MessageFromBotTableField.CHAT_ID;
  }

  static get tableName(): string {
    return TableName.MESSAGE_FOR_USERS;
  }
}

export { MessageFromBot };
