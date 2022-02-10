import { FastifyPluginAsync } from 'fastify';
import { group as groupServ } from '~/services/services';
import { HttpCode, HttpMethod, GroupsApiPath } from '~/common/enums/enums';

type Options = {
  services: {
    group: typeof groupServ;
  };
};

const initGroupApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { group: groupService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: GroupsApiPath.ROOT,
    async handler(_req, rep) {
      return rep.send(await groupService.getAll()).status(HttpCode.OK);
    },
  });
};

export { initGroupApi };
