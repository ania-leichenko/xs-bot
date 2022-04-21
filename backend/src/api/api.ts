import { FastifyPluginAsync } from 'fastify';
import { initUsersApi } from './user';
import {
  users,
} from '~/services/services';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.register(initUsersApi, {
    services: {
      users,
    },
  });
};

export { initApi };
