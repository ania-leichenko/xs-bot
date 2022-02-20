import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { slcFunction as slcFunctionServ } from '~/services/services';
import { slcFunctionCreate as slcFunctionCreateValidationSchema } from '~/validation-schemas/validation-schemas';
import { HttpCode, HttpMethod, SLCApiPath } from '~/common/enums/enums';
import { SLCFunctionCreateRequestDto } from '~/common/types/types';

type Options = {
  services: {
    slcFunction: typeof slcFunctionServ;
  };
};

const initSLCApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { slcFunction: slcFunctionService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: SLCApiPath.ROOT,
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
        .send(await slcFunctionService.create({ ...req.body, token }))
        .status(HttpCode.CREATED);
    },
  });
};

export { initSLCApi };
