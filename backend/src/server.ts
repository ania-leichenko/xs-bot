import Fastify from 'fastify';
import Knex from 'knex';
import { Model } from 'objection';
import { ENV } from '~/common/enums/enums';
import { initApi } from '~/api/api';
import knexConfig from '../knexfile';

const app = Fastify({
  logger: {
    prettyPrint: true,
  },
});

Model.knex(Knex(knexConfig[ENV.APP.NODE_ENV]));

app.register(initApi, {
  prefix: ENV.API.V1_PREFIX,
});

app.listen(ENV.APP.SERVER_PORT, ENV.APP.SERVER_HOST, (err, address) => {
  if (err) {
    app.log.error(err);
  }
  app.log.info(
    `Listening to connections on — ${address}, Environment: ${ENV.APP.NODE_ENV}`,
  );
});
