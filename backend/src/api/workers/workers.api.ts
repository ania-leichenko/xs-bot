import { FastifyPluginAsync } from 'fastify';
import { worker as workerServ } from '~/services/services';
import { HttpCode, HttpMethod, WorkersApiPath } from '~/common/enums/enums';

type Options = {
  services: {
    worker: typeof workerServ;
  };
};

const initWorkersApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { worker: workerService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: WorkersApiPath.EAM,
    async handler(req, rep) {
      const workers = await workerService.getAll();
      return rep.send(workers).status(HttpCode.OK);
    },
  });
};

export { initWorkersApi };
