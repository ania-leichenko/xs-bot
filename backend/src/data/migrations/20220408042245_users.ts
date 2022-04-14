import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.USERS;

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigint('chat_id').notNullable();
    table.string('first_name').notNullable();
    table.string('username').notNullable();
    table.tinyint('admin').notNullable().defaultTo(0);
    table.datetime('joined').notNullable();
    table.datetime('last_action').notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
