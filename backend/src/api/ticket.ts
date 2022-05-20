import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import {
  messageForUsers as messageForUsersServ,
  ticket as ticketServ,
} from '~/services/services';
import fetch from 'node-fetch';
import { ENV, WARNING_ICON } from '~/common/enums/enums';

type Options = {
  services: {
    ticket: typeof ticketServ;
    messageForUsers: typeof messageForUsersServ;
  };
};

type Params = {
  id: number;
};

type Body = {
  ticket: number;
  subscriptionTime: Date;
  plan: string;
  paymentMethod: string;
  status: string;
  chatId: number;
  messageForUser: string;
};

const initTicketsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { ticket: ticketService, messageForUsers: messageForUsers } =
    opts.services;

  fastify.route({
    method: 'GET',
    url: '/tickets',
    async handler(req: FastifyRequest, rep: FastifyReply) {
      const tickets = await ticketService.getAllTickets();

      return rep
        .send(tickets.filter((ticket) => ticket.deletedAt == null && ticket.status !== 'Inactive'))
        .status(200);
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/tickets/:id',
    async handler(
      req: FastifyRequest<{ Params: Params; Body: Body }>,
      rep: FastifyReply,
    ) {
      await ticketService.softDelete(req.params.id);
      const messages = await messageForUsers.create({
        chatId: req.body.chatId,
        message: req.body.messageForUser,
      });
      fetch(
        `https://api.telegram.org/bot${ENV.TELEGRAM_TOKEN}/sendMessage?chat_id=${messages.chatId}&text=${WARNING_ICON} SYSTEM MESSAGE ${WARNING_ICON} ${messages.message}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        },
      );
      await ticketService.updateStatus(req.params.id);
      const tickets = await ticketService.getAllTickets();
      rep.send(tickets.filter((ticket) => ticket.deletedAt == null)).status(200);
    },
  });
  fastify.route({
    method: 'POST',
    url: '/tickets/:id',
    async handler(req: FastifyRequest<{ Params: Params; Body: Body }>, rep) {
      await ticketService.update({
        ticket: req.params.id,
        subscriptionTime: req.body.subscriptionTime,
        status: req.body.status,
      });
      const messages = await messageForUsers.create({
        chatId: req.body.chatId,
        message: req.body.messageForUser,
      });

      const tickets = await ticketService.getAllTickets();

      const date = new Date();
      if (
        req.body.status === 'Active' &&
        new Date(req.body.subscriptionTime) > date
      ) {
        fetch(
          `https://api.telegram.org/bot${ENV.TELEGRAM_TOKEN}/sendMessage?chat_id=${messages.chatId}&text=${WARNING_ICON} SYSTEM MESSAGE ${WARNING_ICON} ${messages.message}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          },
        );
      }
     rep.send(tickets.filter((ticket) => ticket.deletedAt == null)).status(200);
    },
  });
};

export { initTicketsApi };
