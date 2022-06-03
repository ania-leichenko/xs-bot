import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { users as usersServ } from '~/services/services';
import {
  ENV,
  BRONZE_BONUS,
  SILVER_BONUS,
  GOLD_BONUS,
  PLATINUM_BONUS,
} from '~/common/enums/enums';
import fetch from 'node-fetch';

type Options = {
  services: {
    users: typeof usersServ;
  };
};

type Params = {
  id: number;
};

type Body = {
  admin: number;
  countOfSubscription: number;
};

const initUsersApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { users: usersService } = opts.services;

  fastify.route({
    method: 'GET',
    url: '/users',
    async handler(req: FastifyRequest, rep: FastifyReply) {
      const users = await usersService.getAllUsers();
      return rep.send(users).status(200);
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/user/:id',
    async handler(req: FastifyRequest<{ Params: Params }>, rep: FastifyReply) {
      await usersService.delete(req.params.id);
      const users = await usersService.getAllUsers();
      return rep.send(users).status(200);
    },
  });
  fastify.route({
    method: 'POST',
    url: '/user/:id',
    async handler(
      req: FastifyRequest<{ Params: Params; Body: Body }>,
      rep: FastifyReply,
    ) {
      const countOfSubscription = req.body.countOfSubscription;
      if (countOfSubscription < 12) {
        //console.log('.........', req.params.id);
        if (countOfSubscription === 2) {
          fetch(
            `https://api.telegram.org/bot${ENV.TELEGRAM_TOKEN}/sendMessage?chat_id=${req.params.id}&text=${BRONZE_BONUS}&parse_mode=HTML`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            },
          );
        }
        if (countOfSubscription === 4) {
          fetch(
            `https://api.telegram.org/bot${ENV.TELEGRAM_TOKEN}/sendMessage?chat_id=${req.params.id}&text=${SILVER_BONUS}&parse_mode=HTML`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            },
          );
        }
        if (countOfSubscription === 6) {
          fetch(
            `https://api.telegram.org/bot${ENV.TELEGRAM_TOKEN}/sendMessage?chat_id=${req.params.id}&text=${GOLD_BONUS}&parse_mode=HTML`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            },
          );
        }
        if (countOfSubscription === 12) {
          fetch(
            `https://api.telegram.org/bot${ENV.TELEGRAM_TOKEN}/sendMessage?chat_id=${req.params.id}&text=${PLATINUM_BONUS}&parse_mode=HTML`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            },
          );
       }
      }
      await usersService.update({
        chatId: req.params.id,
        admin: req.body.admin,
        countOfSubscription: req.body.countOfSubscription,
      });
      const users = await usersService.getAllUsers();
      return rep.send(users).status(200);
    },
  });
};

export { initUsersApi };
