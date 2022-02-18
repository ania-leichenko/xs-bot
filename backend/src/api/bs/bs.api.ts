import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { space as spaceServ } from '~/services/services';
import { HttpCode, HttpMethod, BSApiPath } from '~/common/enums/enums';
import { BSSpaceCreateRequestDto } from '~/common/types/types';

type Options = {
  services: {
    space: typeof spaceServ;
  };
};

const initBsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { space: spaceService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: BSApiPath.ROOT,
    async handler(req: FastifyRequest<{ Body: BSSpaceCreateRequestDto }>, rep) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];

      return rep
        .send(
          await spaceService.create({
            name: req.body.name,
            token,
          }),
        )
        .status(HttpCode.CREATED);
    },
  });
};

export { initBsApi };
