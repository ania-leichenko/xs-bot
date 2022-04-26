import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { paidList as paidListServ } from '~/services/services';

type Options = {
  services: {
    paidList: typeof paidListServ;
  };
};

type Params = {
  id: number;
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

  fastify.route({
    method: 'DELETE',
    url: '/tickets/:id',
    async handler(req: FastifyRequest<{ Params: Params }>, rep: FastifyReply) {
      await paidListService.delete(req.params.id);
      const tickets = await paidListService.getAllTickets();
      return rep.send(tickets).status(200);
    },
  });
};

export { initTicketsApi };
