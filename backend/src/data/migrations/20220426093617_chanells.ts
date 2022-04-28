import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.CHANELLS;

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigInteger('channel_id').unique().notNullable();
    table.string('plan').notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
