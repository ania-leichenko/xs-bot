import { Knex } from 'knex';
import { getFormattedISODate } from '~/helpers/helpers';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.OPERATION_SYSTEMS;

async function up(knex: Knex): Promise<void> {
  const dateNowISO = getFormattedISODate(new Date());

  await knex.raw('CREATE SCHEMA IF NOT EXISTS server_computing;');

  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid('id')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary({ constraintName: 'operation_systems_pkey' });
    table.string('name').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
    table.string('aws_generation_name').notNullable();
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
