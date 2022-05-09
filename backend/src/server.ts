import Fastify from 'fastify';
import Knex from 'knex';
import { AbstractModel } from './data/models/abstract/abstract.model';
import { ENV } from '~/common/enums/enums';
import { initApi } from '~/api/api';
import knexConfig from '../knexfile';
import cors from 'fastify-cors';
import { task } from './services/cron/cron';

const app = Fastify({
  bodyLimit: 6 * 1024 * 1024,
  logger: {
    prettyPrint: true,
  },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
AbstractModel.knex(Knex(knexConfig[ENV.APP.NODE_ENV]));

app.register(cors, {
  origin: ENV.APP.FRONTEND_URL,
});

app.register(initApi);

app.listen(ENV.APP.SERVER_PORT, ENV.APP.SERVER_HOST, (err, address) => {
  if (err) {
    app.log.error(err);
  }
  app.log.info(
    `Listening to connections on - ${address}, Environment: ${ENV.APP.NODE_ENV}`,
  );
});

task.start();
