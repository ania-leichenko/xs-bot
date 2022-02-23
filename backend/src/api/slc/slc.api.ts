import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { slcFunction as slcFunctionServ } from '~/services/services';
import { slcFunctionCreate as slcFunctionCreateValidationSchema } from '~/validation-schemas/validation-schemas';
import { HttpCode, HttpMethod, SLCApiPath } from '~/common/enums/enums';
import {
  SLCFunctionCreateRequestDto,
  SLCFunctionGetRequestParamsDto,
} from '~/common/types/types';

type Options = {
  services: {
    slcFunction: typeof slcFunctionServ;
  };
};

const initSLCApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { slcFunction: slcFunctionService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: SLCApiPath.SLC_FUNCTIONS,
    schema: {
      body: slcFunctionCreateValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof slcFunctionCreateValidationSchema>) {
      return (
        data: SLCFunctionCreateRequestDto,
      ): ReturnType<typeof slcFunctionCreateValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(
      req: FastifyRequest<{ Body: SLCFunctionCreateRequestDto }>,
      rep,
    ) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];

      return rep
        .send(await slcFunctionService.create({ name: req.body.name, token }))
        .status(HttpCode.CREATED);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: SLCApiPath.SLC_FUNCTIONS,
    async handler(
      req: FastifyRequest<{ Querystring: SLCFunctionGetRequestParamsDto }>,
      rep,
    ) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];

      const slcFunctions = await slcFunctionService.getSLCFunctionsByTenant({
        query: req.query,
        token,
      });

      return rep.send(slcFunctions).status(HttpCode.OK);
    },
  });
};

export { initSLCApi };
