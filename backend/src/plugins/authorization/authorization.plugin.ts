import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { ControllerHook, ExceptionMessage } from '../../common/enums/enums';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import { master as masterServ, token as tokenServ } from '~/services/services';

type Options = {
  routesWhiteList: string[];
  services: {
    master: typeof masterServ;
    token: typeof tokenServ;
  };
};

const authorization = fp(
  (
    fastify: FastifyInstance,
    { routesWhiteList, services }: Options,
    done: (err?: Error) => void,
  ) => {
    fastify.addHook(ControllerHook.ON_REQUEST, async (request) => {
      const isWhiteRoute = routesWhiteList.some(
        (route) => route === request.routerPath,
      );
      if (isWhiteRoute) {
        return;
      }

      const [, token] = request.headers?.authorization?.split(' ') ?? [];
      const { master, token: tokenService } = services;
      const { id } = (await tokenService.verify(token)) as { id: string };

      const authorizedUser = await master.getMasterById(id);
      if (!authorizedUser) {
        throw new InvalidCredentialsError({
          message: ExceptionMessage.INVALID_TOKEN,
        });
      }

      fastify.decorateRequest('user', authorizedUser);
    });

    done();
  },
);

export { authorization };
