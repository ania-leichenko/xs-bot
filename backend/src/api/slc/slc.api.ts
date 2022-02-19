import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { slc as functionServ } from '~/services/services';
import { slcFunctionCreate as slcFunctionCreateValidationSchema } from '~/validation-schemas/validation-schemas';
import { HttpCode, HttpMethod, SLCApiPath } from '~/common/enums/enums';
import { SLCFunctionCreateRequestDto } from '~/common/types/types';

type Options = {
  services: {
    function: typeof functionServ;
  };
};

const initSLCApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { function: functionService } = opts.services;

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
        .send(await functionService.create({ slc: req.body, token }))
        .status(HttpCode.CREATED);
    },
  });
};

export { initSLCApi };
