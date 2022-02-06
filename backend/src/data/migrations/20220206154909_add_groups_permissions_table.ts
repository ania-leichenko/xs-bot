import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.GROUPS_PERMISSIONS;

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid('id')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary({ constraintName: 'groups_permissions_pkey' });
    table
      .uuid('group_id')
      .notNullable()
      .references('id')
      .inTable(TableName.GROUPS);
    table
      .uuid('permission_id')
      .notNullable()
      .references('id')
      .inTable(TableName.PERMISSIONS);
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
