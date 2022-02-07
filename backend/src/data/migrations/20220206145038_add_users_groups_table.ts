import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.USERS_GROUPS;
async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid('id')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary({ constraintName: 'users_groups_pkey' });
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable(TableName.WORKERS);
    table
      .uuid('group_id')
      .notNullable()
      .references('id')
      .inTable(TableName.GROUPS);
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
