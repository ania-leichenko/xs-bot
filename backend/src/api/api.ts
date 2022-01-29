import { ApiPath } from 'bws-shared/common/enums/enums';
import { FastifyPluginAsync } from 'fastify';
import { masterService } from '~/services/services';
import { initMastersApi } from './masters/masters.api';

const initApi: FastifyPluginAsync = async (fastify) => {
  fastify.register(initMastersApi, {
    services: {
      masterService,
    },
    prefix: ApiPath.MASTERS,
  });
};

export { initApi };
