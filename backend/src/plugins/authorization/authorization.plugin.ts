import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { ControllerHook, ExceptionMessage } from '~/common/enums/enums';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import { auth as authServ } from '~/services/services';
import {
  EAMMasterSignInResponseDto,
  EAMWorkerSignInResponseDto,
} from '~/common/types/types';

type Options = {
  whiteRoutes: string[];
  services: {
    auth: typeof authServ;
  };
};

declare module 'fastify' {
  interface FastifyRequest {
    user: EAMMasterSignInResponseDto | EAMWorkerSignInResponseDto;
  }
}

const authorization: FastifyPluginAsync<Options> = fp(async (fastify, opts) => {
  const { whiteRoutes, services } = opts;
  const { auth } = services;

  fastify.addHook(ControllerHook.ON_REQUEST, async (request) => {
    const isWhiteRoute = whiteRoutes.some(
      (route) => route === request.routerPath,
    );
    if (isWhiteRoute) {
      return;
    }

    const [, token] = request.headers?.authorization?.split(' ') ?? [];
    if (typeof token !== 'string') {
      throw new InvalidCredentialsError({
        message: ExceptionMessage.UNAUTHORIZED_USER,
      });
    }

    request.user = await auth.getCurrentUser(token);
  });
});

export { authorization };
