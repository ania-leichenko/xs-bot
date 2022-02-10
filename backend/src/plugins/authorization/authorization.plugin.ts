import { FastifyPluginAsync } from 'fastify';
import { ControllerHook, ExceptionMessage } from '~/common/enums/enums';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import { master as masterServ, token as tokenServ } from '~/services/services';

type Options = {
  whiteRoutes: string[];
  services: {
    master: typeof masterServ;
    token: typeof tokenServ;
  };
};

const authorization: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { whiteRoutes, services } = opts;
  const { master, token: tokenService } = services;

  fastify.addHook(ControllerHook.ON_REQUEST, async (request) => {
    const isWhiteRoute = whiteRoutes.some(
      (route) => route === request.routerPath,
    );
    if (isWhiteRoute) {
      return;
    }

    const [, token] = request.headers?.authorization?.split(' ') ?? [];
    const { id } = (await tokenService.decode(token)) as { id: string };

    const authorizedUser = await master.getMasterById(id);
    if (!authorizedUser) {
      throw new InvalidCredentialsError({
        message: ExceptionMessage.INVALID_TOKEN,
      });
    }

    fastify.decorateRequest('user', authorizedUser);
  });
};
export { authorization };
