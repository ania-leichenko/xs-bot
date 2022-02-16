import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import {
  ControllerHook,
  ExceptionMessage,
  UserRole,
} from '~/common/enums/enums';
import { TokenPayload } from '~/common/types/types';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import {
  master as masterServ,
  worker as workerServ,
  token as tokenServ,
} from '~/services/services';

type Options = {
  whiteRoutes: string[];
  services: {
    master: typeof masterServ;
    worker: typeof workerServ;
    token: typeof tokenServ;
  };
};

const authorization: FastifyPluginAsync<Options> = fp(async (fastify, opts) => {
  const { whiteRoutes, services } = opts;
  const { master, worker, token: tokenService } = services;

  fastify.addHook(ControllerHook.ON_REQUEST, async (request) => {
    const isWhiteRoute = whiteRoutes.some(
      (route) => route === request.routerPath,
    );
    if (isWhiteRoute) {
      return;
    }

    try {
      const [, token] = request.headers?.authorization?.split(' ') ?? [];
      const { userId, userRole } = tokenService.decode<TokenPayload>(token);

      const authorizedUser =
        userRole === UserRole.MASTER
          ? await master.getMasterById(userId)
          : await worker.getWorkerById(userId);

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
