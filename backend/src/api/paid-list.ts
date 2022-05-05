import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { ticket as ticketServ } from '~/services/services';

type Options = {
  services: {
    ticket: typeof ticketServ;
  };
};

type Params = {
  id: number;
};

type Body = {
  ticket: number;
  subcriptionTime: Date;
  plan: string;
  paymentMethod: string;
  status: string;
};

const initTicketsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { ticket: ticketService } = opts.services;

  fastify.route({
    method: 'GET',
    url: '/tickets',
    async handler(req: FastifyRequest, rep: FastifyReply) {
      const tickets = await ticketService.getAllTickets();
      return rep.send(tickets).status(200);
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/tickets/:id',
    async handler(req: FastifyRequest<{ Params: Params }>, rep: FastifyReply) {
      await ticketService.delete(req.params.id);
      const tickets = await ticketService.getAllTickets();
      return rep.send(tickets).status(200);
    },
  });
  fastify.route({
    method: 'POST',
    url: '/tickets/:id',
    async handler(
      req: FastifyRequest<{ Params: Params; Body: Body }>,
      rep: FastifyReply,
    ) {
      await ticketService.update({
        ticket: req.params.id,
        subcriptionTime: req.body.subcriptionTime,
        status: req.body.status,
      });
      const tickets = await ticketService.getAllTickets();
      return rep.send(tickets).status(200);
    },
  });
};

export { initTicketsApi };
