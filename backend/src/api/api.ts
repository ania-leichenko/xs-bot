import { FastifyPluginAsync } from 'fastify';
import { initUsersApi } from './user';
import { initTicketsApi } from './paid-list';
import {
  users,
  paidList,
} from '~/services/services';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.register(initUsersApi, {
    services: {
      users,
    },
  });
  fastify.register(initTicketsApi, {
    services: {
      paidList,
    },
  });
};

export { initApi };
