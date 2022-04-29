import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.MESSAGE_FROM_BOT;

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigint('chat_id').notNullable();
    table.bigint('message_id').notNullable();
    table.string('message_id_from_channel').notNullable();
    table.datetime('created_at').notNullable();
    table.datetime('updated_at').notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
