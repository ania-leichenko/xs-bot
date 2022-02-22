import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.WORKERS;

async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, function (table) {
    table.dropNullable('tenant_id');
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, function (table) {
    table.setNullable('tenant_id');
  });
}

export { up, down };
