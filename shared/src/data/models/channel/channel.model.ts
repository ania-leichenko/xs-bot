//import { Model, RelationMappings } from 'objection';
//import { join } from 'path';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { ChannelTableField } from './channel-table-field.enum';

class Channel extends AbstractModel {
  [ChannelTableField.CHANNEL_ID]: number;
  [ChannelTableField.PLAN]: string;

  static get idColumn(): string {
    return ChannelTableField.CHANNEL_ID;
  }

  static get tableName(): string {
    return TableName.CHANELLS;
  }
}

export { Channel };
