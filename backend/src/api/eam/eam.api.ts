import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { group as groupServ, worker as workerServ } from '~/services/services';
import { HttpCode, HttpMethod, EAMApiPath } from '~/common/enums/enums';
import { EAMGroupCreateRequestDto } from '~/common/types/types';

type Options = {
  services: {
    group: typeof groupServ;
    worker: typeof workerServ;
  };
};

const initEamApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { group: groupService, worker: workerService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: EAMApiPath.GROUPS,
    async handler(
      req: FastifyRequest<{ Body: EAMGroupCreateRequestDto }>,
      rep,
    ) {
      const group = await groupService.create(req.body);
      return rep.send(group).status(HttpCode.CREATED);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: EAMApiPath.WORKERS,
    async handler(req, rep) {
      const workers = await workerService.getAll();
      return rep.send(workers).status(HttpCode.OK);
    },
  });
};

export { initEamApi };
