import Fastify from 'fastify';
import Knex from 'knex';
import { Model } from 'objection';
import { ENV } from '~/common/enums/enums';
import { initApi } from '~/api/api';
import knexConfig from '../knexfile';
import cors from 'fastify-cors';
import { backgroundJob } from '~/services/services';
import { upload as uploadHook } from './hooks/hooks';

const app = Fastify({
  bodyLimit: 6 * 1024 * 1024,
  logger: {
    prettyPrint: true,
  },
});

Model.knex(Knex(knexConfig[ENV.APP.NODE_ENV]));

app.register(cors, {
  origin: ENV.APP.FRONTEND_URL,
});

app.register(uploadHook.contentParser);

app.register(initApi, {
  prefix: ENV.API.V1_PREFIX,
});

app.listen(ENV.APP.SERVER_PORT, ENV.APP.SERVER_HOST, (err, address) => {
  if (err) {
    app.log.error(err);
  }
  backgroundJob.clearInstances();
  app.log.info(
    `Listening to connections on - ${address}, Environment: ${ENV.APP.NODE_ENV}`,
  );
});
