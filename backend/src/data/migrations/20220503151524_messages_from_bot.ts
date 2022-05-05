import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.MESSAGES_FROM_BOT;

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .bigint('chat_id')
      .notNullable()
      .references('chat_id')
      .inTable(TableName.USERS);
    table.bigint('message_id').notNullable();
    table.bigint('channel_message_id').notNullable();
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
