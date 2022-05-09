import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.TICKETS;

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('ticket').unique().notNullable();
    table
      .bigint('chat_id')
      .notNullable()
      .references('chat_id')
      .inTable(TableName.USERS);
    table.string('first_name').notNullable();
    table.string('username').notNullable();
    table.timestamp('subscription_time').notNullable();
    table.string('plan').notNullable();
    table.string('payment_method').notNullable();
    table.string('status').notNullable();
    table.string('country').notNullable();
    table.timestamp('deleted_at');
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
