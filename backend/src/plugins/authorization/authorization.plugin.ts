import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { ControllerHook, ExceptionMessage } from '../../common/enums/enums';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import { master, token as tokenServ } from '~/services/services';

const authorization = fp(
  (
    fastify: FastifyInstance,
    {
      routesWhiteList,
      services,
    }: {
      routesWhiteList: string[];
      services: { master: typeof master };
    },
    done: (err?: Error) => void,
  ) => {
    fastify.decorateRequest('user', null);

    fastify.addHook(ControllerHook.ON_REQUEST, async (request) => {
      const isWhiteRoute = routesWhiteList.some(
        (route) => route === request.routerPath,
      );

      if (isWhiteRoute) {
        return;
      }

      const [, token] = request.headers?.authorization?.split(' ') ?? [];
      const { master } = services;
      const { id } = (await tokenServ.verify(token)) as { id: string };

      const authorizedUser = await master.getMasterById(id);
      if (!authorizedUser) {
        throw new InvalidCredentialsError({
          message: ExceptionMessage.INVALID_TOKEN,
        });
      }

      request.user = authorizedUser;
    });

    done();
  },
);

export { authorization };
