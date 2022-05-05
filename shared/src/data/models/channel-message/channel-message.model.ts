//import { Model, RelationMappings } from 'objection';
//import { join } from 'path';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { ChannelMessageTableField } from './channel-message-table-field.enum';

class ChannelMessage extends AbstractModel {
  [ChannelMessageTableField.ID]: string;
  [ChannelMessageTableField.CHANNEL_ID]: number;
  [ChannelMessageTableField.MESSAGE_ID]: number;
  [ChannelMessageTableField.MESSAGE]: string;
  [ChannelMessageTableField.CREATED_AT]: Date;
  [ChannelMessageTableField.UPDATED_AT]: Date;

  static get idColumn(): string {
    return ChannelMessageTableField.ID;
  }

  static get tableName(): string {
    return TableName.MESSAGE_FROM_CHANNELS;
  }
}

export { ChannelMessage };
