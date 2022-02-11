import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { worker as workerServ } from '~/services/services';
import { HttpCode, HttpMethod, WorkerApiPath } from '~/common/enums/enums';
import { EAMWorkerCreateRequestDto } from '~/common/types/types';

type Options = {
  services: {
    worker: typeof workerServ;
  };
};

const initWorkerApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { worker: workerService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: WorkerApiPath.WORKER,
    async handler(
      req: FastifyRequest<{ Body: EAMWorkerCreateRequestDto }>,
      rep,
    ) {
      return rep.send(await workerService.create(req.body)).status(HttpCode.OK);
    },
  });
};

export { initWorkerApi };
