import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { users as usersServ } from '~/services/services';

type Options = {
  services: {
    users: typeof usersServ;
  };
};

const initUsersApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { users: usersService } = opts.services;

  fastify.route({
    method: 'GET',
    url: '/users',
    async handler(req: FastifyRequest, rep: FastifyReply) {
      const users =  await usersService.getAllUsers();
      return rep.send(users)
      .status(200);
    },
  });
};

export { initUsersApi };
