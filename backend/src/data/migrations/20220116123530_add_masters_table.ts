import { Knex } from 'knex';
import { getFormattedISODate } from '~/helpers/helpers';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.MASTERS;

async function up(knex: Knex): Promise<void> {
  const dateNowISO = getFormattedISODate(new Date());

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.raw('CREATE SCHEMA IF NOT EXISTS entity_access_management;');

  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .uuid('id')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary({ constraintName: 'masters_pkey' });
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.text('password_hash').notNullable();
    table.text('password_salt').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(dateNowISO);
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
