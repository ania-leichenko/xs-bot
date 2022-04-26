import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { paidList as paidListServ } from '~/services/services';

type Options = {
  services: {
    paidList: typeof paidListServ;
  };
};

const initTicketsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { paidList: paidListService } = opts.services;

  fastify.route({
    method: 'GET',
    url: '/tickets',
    async handler(req: FastifyRequest, rep: FastifyReply) {
      const tickets = await paidListService.getAllTickets();
      return rep.send(tickets).status(200);
    },
  });
};

export { initTicketsApi };
