import { FastifyPluginAsync } from 'fastify';
import { ApiPath } from '~/common/enums/enums';
import { master, token, tenant, worker } from '~/services/services';
import { initMastersApi } from './masters/masters.api';
import { initTenantsApi } from './tenants/tenants.api';
import { initWorkerApi } from './worker/worker.api';
import { authorization as authorizationPlugin } from '~/plugins/plugins';
import { WHITE_ROUTES } from '~/common/constants/constants';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.register(authorizationPlugin, {
    services: {
      master,
      token,
    },
    whiteRoutes: WHITE_ROUTES,
  });
  fastify.register(initMastersApi, {
    services: {
      master,
    },
    prefix: ApiPath.MASTERS,
  });
  fastify.register(initTenantsApi, {
    services: {
      tenant,
    },
    prefix: ApiPath.TENANTS,
  });
  fastify.register(initWorkerApi, {
    services: { worker },
    prefix: ApiPath.EAM,
  });
};

export { initApi };
