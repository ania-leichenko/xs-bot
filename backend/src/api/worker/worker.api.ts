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
    method: HttpMethod.GET,
    url: WorkerApiPath.ROOT,
    async handler(req, rep) {
      return rep.send(await workerService.getAll());
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: WorkerApiPath.WORKER,
    async handler(
      req: FastifyRequest<{ Body: EAMWorkerCreateRequestDto }>,
      rep,
    ) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];

      return rep
        .send(
          await workerService.create({
            name: req.body.name,
            password: req.body.password,
            token,
          }),
        )
        .status(HttpCode.OK);
    },
  });
};

export { initWorkerApi };
