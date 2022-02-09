import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { master as masterServ } from '~/services/services';
import { masterSignUp as masterSignUpValidationSchema } from '~/validation-schemas/validation-schemas';
import { HttpCode, HttpMethod, MastersApiPath } from '~/common/enums/enums';
import { MasterSignUpRequestDto } from '~/common/types/types';

type Options = {
  services: {
    master: typeof masterServ;
  };
};

const initMastersApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { master: masterService } = opts.services;

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
        data: MasterSignUpRequestDto,
      ): ReturnType<typeof masterSignUpValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(req: FastifyRequest<{ Body: MasterSignUpRequestDto }>, rep) {
      const user = await masterService.create(req.body);
      return rep.send(user).status(HttpCode.CREATED);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: MastersApiPath.USER,
    async handler(req, rep) {
      const authorization: string = req.headers.authorization ?? '';
      return rep
        .send(await masterService.getCurrentUser(authorization))
        .status(HttpCode.OK);
    },
  });
};

export { initMastersApi };
