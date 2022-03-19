import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.INSTANCES;

async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.string('state').notNullable();
    table.setNullable('hostname');
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn('state');
    table.dropNullable('hostname');
  });
}

export { up, down };
