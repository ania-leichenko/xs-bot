import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.MESSAGE_FROM_CHANNELS;

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, function (table) {
    table.text('message').notNullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, function (table) {
    table.string('message').notNullable().alter();
  });
}
