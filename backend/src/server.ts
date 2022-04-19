import Fastify from 'fastify';
import Knex from 'knex';
import { Model } from 'objection';
import { ENV } from '~/common/enums/enums';
import { initApi } from '~/api/api';
import knexConfig from '../knexfile';
import cors from 'fastify-cors';

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

app.register(initApi, {
  prefix: ENV.API.V1_PREFIX,
});
