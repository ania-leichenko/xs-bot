import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { space as spaceServ } from '~/services/services';
import { HttpCode, HttpMethod, SpacesApiPath } from '~/common/enums/enums';
import { BSSpaceDeleteParamsDto } from '~/common/types/types';

type Options = {
  services: {
    space: typeof spaceServ;
  };
};

const initSpacesApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { space: spaceService } = opts.services;

  fastify.route({
    method: HttpMethod.DELETE,
    url: SpacesApiPath.$ID,
    async handler(
      req: FastifyRequest<{ Params: BSSpaceDeleteParamsDto }>,
      rep,
    ) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];
      const { id } = req.params;

      await spaceService.delete({
        id,
        token,
      });

      return rep.send(true).status(HttpCode.OK);
    },
  });
};

export { initSpacesApi };
