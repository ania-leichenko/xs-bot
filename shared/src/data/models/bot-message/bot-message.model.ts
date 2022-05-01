//import { Model, RelationMappings } from 'objection';
//import { join } from 'path';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { BotMessageTableField } from './bot-message-table-field.enum';

class BotMessage extends AbstractModel {
  [BotMessageTableField.CHAT_ID]: number;
  [BotMessageTableField.MESSAGE_ID]: number;
  [BotMessageTableField.MESSAGE_ID_FROM_CHANNEL]: number;
  [BotMessageTableField.CREATED_AT]: Date;
  [BotMessageTableField.UPDATED_AT]: Date;

  static get idColumn(): string {
    return BotMessageTableField.CHAT_ID;
  }

  static get tableName(): string {
    return TableName.MESSAGE_FROM_BOT;
  }
}

export { BotMessage };
