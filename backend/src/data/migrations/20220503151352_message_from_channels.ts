import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.MESSAGE_FROM_CHANNELS;

async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table
      .increments('id')
      .unique()
      .notNullable()
      .primary({ constraintName: 'message_from_channels_pkey' });
    table
      .bigint('channel_id')
      .notNullable()
      .references('channel_id')
      .inTable(TableName.CHANNELS);
    table.bigint('message_id').notNullable();
    table.string('message').notNullable();
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
