import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.PAID_LIST;

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('ticket').unique().notNullable();
    table.bigint('chat_id').notNullable();
    table.string('first_name').notNullable();
    table.string('username').notNullable();
    table.datetime('subcription_time').notNullable();
    table.string('plan').notNullable();
    table.string('payment_method').notNullable();
    table.string('status').notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
