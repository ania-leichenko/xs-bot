import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { instance as InstanceServ } from '~/services/services';
import { HttpCode, HttpMethod, SCApiPath } from '~/common/enums/enums';
import { SCInstanceCreateRequestDto } from '~/common/types/types';

type Options = {
  services: {
    instance: typeof InstanceServ;
  };
};

const initSCApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { instance: instanceService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: SCApiPath.ROOT,
    async handler(
      req: FastifyRequest<{ Body: SCInstanceCreateRequestDto }>,
      rep,
    ) {
      const instance = await instanceService.create(req.body);
      return rep.send(instance).status(HttpCode.CREATED);
    },
  });
};

export { initSCApi };
