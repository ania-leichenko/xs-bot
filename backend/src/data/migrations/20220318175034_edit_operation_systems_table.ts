import { Knex } from 'knex';
import { TableName } from '~/common/enums/enums';

const TABLE_NAME = TableName.OPERATION_SYSTEMS;

const linuxOperationSystem = {
  name: 'linux',
  awsGenerationName: 'ami-0dcc0ebde7b2e00db',
};

async function up(knex: Knex): Promise<void> {
  return knex.insert(linuxOperationSystem).into(TABLE_NAME);
}

async function down(knex: Knex): Promise<void> {
  return knex
    .table(TABLE_NAME)
    .where({
      awsGenerationName: linuxOperationSystem.awsGenerationName,
    })
    .del();
}

export { up, down };
