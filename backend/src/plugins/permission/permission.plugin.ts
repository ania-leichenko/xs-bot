import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import {
  ControllerHook,
  ExceptionMessage,
  HttpCode,
  Permission,
  ApiPath,
  EAMApiPath,
  BSApiPath,
  SCApiPath,
  SLCApiPath,
} from '~/common/enums/enums';
import { auth as authServ } from '~/services/services';
import { checkHasPermission } from '~/helpers/helpers';
import { EAMError } from '~/exceptions/exceptions';

type Options = {
  rootRoute: string;
  services: {
    auth: typeof authServ;
  };
};

const permission: FastifyPluginAsync<Options> = fp(async (fastify, opts) => {
  const { rootRoute, services } = opts;
  const { auth } = services;

  fastify.addHook(ControllerHook.PRE_HANDLER, async (request) => {
    let pagePermission: string[];

    switch (request.routerPath) {
      case `${rootRoute}${ApiPath.EAM}${EAMApiPath.ROOT}`: {
        pagePermission = [Permission.MANAGE_EAM];
        break;
      }
      case `${rootRoute}${ApiPath.BS}${BSApiPath.ROOT}`: {
        pagePermission = [Permission.MANAGE_BS];
        break;
      }
      case `${rootRoute}${ApiPath.SC}${SCApiPath.ROOT}`: {
        pagePermission = [Permission.MANAGE_SC];
        break;
      }
      case `${rootRoute}${ApiPath.SLC}${SLCApiPath.ROOT}`: {
        pagePermission = [Permission.MANAGE_SLC];
        break;
      }
      default: {
        pagePermission = [];
      }
    }

    const [, token] = request.headers?.authorization?.split(' ') ?? [];

    const user = await auth.getCurrentUser(token);
    const hasPermission = await checkHasPermission(
      pagePermission,
      user?.user.permissions ?? [],
    );

    if (!hasPermission) {
      throw new EAMError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.REQUIRED_PERMISSION,
      });
    }
  });
});

export { permission };
