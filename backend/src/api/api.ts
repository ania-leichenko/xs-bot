import { FastifyPluginAsync } from 'fastify';
import { ApiPath } from '~/common/enums/enums';
import { master, group } from '~/services/services';
import { initMastersApi } from './masters/masters.api';
import { initGroupApi } from '~/api/groups/groups.api';

const initApi: FastifyPluginAsync = async (fastify) => {
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
