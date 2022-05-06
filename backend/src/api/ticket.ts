//import { Telegraf } from 'telegraf';
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import {
  messageForUsers as messageForUsersServ,
  ticket as ticketServ,
} from '~/services/services';
 import fetch from 'node-fetch';

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
  subcriptionTime: Date;
  plan: string;
  paymentMethod: string;
  status: string;
  chatId: number;
  messageForUser: string;
};

const initTicketsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { ticket: ticketService, messageForUsers: messageForUsers } =
    opts.services;
  //const token = '5245583761:AAGViUQUROPfgNNSNLLRXK4_GPQ9nUZ3nVw';

  //const bot = new Telegraf(token);

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
      rep,
    ) {
      await ticketService.update({
        ticket: req.params.id,
        subscriptionTime: req.body.subcriptionTime,
        status: req.body.status,
      });
      const messages = await messageForUsers.create({
        chatId: req.body.chatId,
        message: req.body.messageForUser,
      });
      fetch(
        'https://api.telegram.org/bot5245583761:AAGViUQUROPfgNNSNLLRXK4_GPQ9nUZ3nVw/sendMessage?chat_id=1561533553&text=1',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        },
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // eslint-disable-next-line no-console
          console.log(data);
        });
      //bot.telegram.sendMessage(messages.chatId, messages.message);
      const tickets = await ticketService.getAllTickets();
      return rep.send(tickets).status(200);
    },
  });
};

export { initTicketsApi };
