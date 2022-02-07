import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.PERMISSIONS;

const permissions = ['manage-eam', 'manage-sc', 'manage-slc', 'manage-bs'];

async function up(knex: Knex): Promise<void> {
  return knex.insert(permissions.map((name) => ({ name }))).into(TABLE_NAME);
}

async function down(knex: Knex): Promise<void> {
  return knex(TABLE_NAME).whereIn('name', permissions).del();
}

export { up, down };
