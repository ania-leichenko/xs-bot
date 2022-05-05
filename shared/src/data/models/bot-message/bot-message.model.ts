//import { Model, RelationMappings } from 'objection';
//import { join } from 'path';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { BotMessageTableField } from './bot-message-table-field.enum';

class BotMessage extends AbstractModel {
  [BotMessageTableField.CHAT_ID]: number;
  [BotMessageTableField.MESSAGE_ID]: number;
  [BotMessageTableField.CHANNEL_MESSAGE_ID]: string;
  [BotMessageTableField.CREATED_AT]: Date;
  [BotMessageTableField.UPDATED_AT]: Date;

  static get idColumn(): string {
    return BotMessageTableField.MESSAGE_ID;
  }

  static get tableName(): string {
    return TableName.MESSAGES_FROM_BOT;
  }
}

export { BotMessage };
