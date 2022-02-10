import { FastifyPluginAsync } from 'fastify';
import { ApiPath } from '~/common/enums/enums';
import { master, group, token } from '~/services/services';
import { initMastersApi } from './masters/masters.api';
import { authorization as authorizationPlugin } from '~/plugins/plugins';
import { WHITE_ROUTES } from '~/common/constants/constants';
import { initGroupApi } from '~/api/groups/groups.api';

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
  fastify.register(initGroupApi, {
    services: {
      group,
    },
    prefix: ApiPath.EAM,
  });
};

export { initApi };
