import { masterService as masterServ } from '~/services/services';
import {
  HttpCode,
  HttpMethod,
  MastersApiPath,
} from 'bws-shared/common/enums/enums';
import { masterSignUpValidationSchema } from 'bws-shared/validation/master/master';
import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { MasterSignUpDto } from 'bws-shared/dtos/dtos';

type Options = {
  services: {
    masterService: typeof masterServ;
  };
};

const initMastersApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { masterService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: MastersApiPath.ROOT,
    async handler(_req, rep) {
      return rep.send(await masterService.getAll()).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: MastersApiPath.SIGN_UP,
    schema: {
      body: masterSignUpValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof masterSignUpValidationSchema>) {
      return (
        data: MasterSignUpDto,
      ): ReturnType<typeof masterSignUpValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(req: FastifyRequest<{ Body: MasterSignUpDto }>, rep) {
      const user = await masterService.create(req.body);
      return rep.send(user).status(HttpCode.CREATED);
    },
  });
};

export { initMastersApi };
