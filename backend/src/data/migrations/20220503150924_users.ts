import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.USERS;

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .bigint('chat_id')
      .unique()
      .notNullable()
      .primary({ constraintName: 'users_pkey' });
    table.string('first_name').notNullable();
    table.string('username');
    table.tinyint('admin').notNullable().defaultTo(0);
    table.timestamp('joined').notNullable();
    table.timestamp('last_action').notNullable().defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
