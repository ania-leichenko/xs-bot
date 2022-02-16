import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { ControllerHook, ExceptionMessage } from '~/common/enums/enums';
import { TokenPayload } from '~/common/types/types';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import { master as masterServ, token as tokenServ } from '~/services/services';

type Options = {
  whiteRoutes: string[];
  services: {
    master: typeof masterServ;
    token: typeof tokenServ;
  };
};

const authorization: FastifyPluginAsync<Options> = fp(async (fastify, opts) => {
  const { whiteRoutes, services } = opts;
  const { master, token: tokenService } = services;

  fastify.addHook(ControllerHook.ON_REQUEST, async (request) => {
    const isWhiteRoute = whiteRoutes.some(
      (route) => route === request.routerPath,
    );
    if (isWhiteRoute) {
      return;
    }

    try {
      const [, token] = request.headers?.authorization?.split(' ') ?? [];
      const { userId } = tokenService.decode<TokenPayload>(token);

      const authorizedUser = await master.getMasterById(userId);
      if (!authorizedUser) {
        throw new InvalidCredentialsError({
          message: ExceptionMessage.INVALID_TOKEN,
        });
      }
    } catch {
      throw new InvalidCredentialsError({
        message: ExceptionMessage.UNAUTHORIZED_USER,
      });
    }
  });
});

export { authorization };
