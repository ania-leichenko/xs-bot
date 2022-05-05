//import { Model, RelationMappings } from 'objection';
//import { join } from 'path';
import { TableName } from '~/common/enums/enums';
import { AbstractModel } from '../abstract/abstract.model';
import { TicketTableField } from './ticket-table-field.enum';

class Ticket extends AbstractModel {
  [TicketTableField.TICKET]: number;
  [TicketTableField.CHAT_ID]: number;
  [TicketTableField.FIRST_NAME]: string;
  [TicketTableField.USERNAME]: string;
  [TicketTableField.SUBSCRIPTION_TIME]: Date;
  [TicketTableField.PLAN]: string;
  [TicketTableField.PAYMENT_METHOD]: string;
  [TicketTableField.STATUS]: string;
  [TicketTableField.COUNTRY]: string;

  static get idColumn(): string {
    return TicketTableField.TICKET;
  }

  static get tableName(): string {
    return TableName.TICKETS;
  }
}

export { Ticket };
