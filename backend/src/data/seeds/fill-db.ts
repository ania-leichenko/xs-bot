import { Knex } from 'knex';
import { operationSystem } from '~/data/seed-data/operation-system.seed';
import { TableName } from '~/common/enums/db/table-name.enum';

async function seed(knex: Knex): Promise<void> {
  await knex.transaction(async (trx) => {
    await trx(TableName.OPERATION_SYSTEMS).del();
    await trx(TableName.OPERATION_SYSTEMS).insert(operationSystem);
  });
}

export { seed };
