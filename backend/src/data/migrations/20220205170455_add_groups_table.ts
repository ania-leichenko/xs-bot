import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.GROUPS;

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid('id')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary({ constraintName: 'groups_pkey' });
    table.string('name').notNullable();
    table
      .uuid('tenant_id')
      .notNullable()
      .references('id')
      .inTable(TableName.TENANTS);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
