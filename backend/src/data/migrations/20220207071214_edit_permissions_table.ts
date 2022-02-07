import { Knex } from 'knex';
import { Permissions, TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.PERMISSIONS;

export async function up(knex: Knex): Promise<void> {
  return knex
    .insert([
      { name: Permissions.MANAGE_EAM },
      { name: Permissions.MANAGE_SC },
      { name: Permissions.MANAGE_SLC },
      { name: Permissions.MANAGE_BS },
    ])
    .into(TABLE_NAME);
}

export async function down(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .whereIn('name', [
      Permissions.MANAGE_EAM,
      Permissions.MANAGE_SC,
      Permissions.MANAGE_SLC,
      Permissions.MANAGE_BS,
    ])
    .del();
}
