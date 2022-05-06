import { FastifyPluginAsync } from 'fastify';
import { initUsersApi } from './user';
import { initTicketsApi } from './ticket';
import { users, ticket, messageForUsers } from '~/services/services';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.register(initUsersApi, {
    services: {
      users,
    },
  });
  fastify.register(initTicketsApi, {
    services: {
      ticket,
      messageForUsers,
    },
  });
};

export { initApi };
