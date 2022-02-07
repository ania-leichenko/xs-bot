import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.MASTERS;

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, function (table) {
    table.uuid('tenant_id').references('id').inTable(TableName.TENANTS);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, function (table) {
    table.dropColumn('tenant_id');
  });
}
