import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import {
  slcFunction as slcFunctionServ,
  token as tokenServ,
} from '~/services/services';
import { slcFunctionCreate as slcFunctionCreateValidationSchema } from '~/validation-schemas/validation-schemas';
import {
  HttpCode,
  HttpMethod,
  SLCApiPath,
  SLCFunctionApiPath,
  UserRole,
  ExceptionMessage,
} from '~/common/enums/enums';
import {
  SLCFunctionCreateRequestDto,
  SLCFunctionGetRequestParamsDto,
  SLCFunctionDeleteParamsDto,
  SLCFunctionUpdateParamsDto,
  SLCFunctionUpdateRequestDto,
  SLCFunctionLoadParamsDto,
  SLCFunctionRunParamsDto,
  TokenPayload,
} from '~/common/types/types';
import { SLCError } from '~/exceptions/exceptions';

type Options = {
  services: {
    slcFunction: typeof slcFunctionServ;
    token: typeof tokenServ;
  };
};

const initSLCApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { slcFunction: slcFunctionService } = opts.services;
  const { token: tokenService } = opts.services;

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
    method: HttpMethod.POST,
    url: `${SLCApiPath.SLC_FUNCTIONS}${SLCFunctionApiPath.$ID}`,
    async handler(
      req: FastifyRequest<{
        Params: SLCFunctionRunParamsDto;
      }>,
      rep,
    ) {
      return rep
        .send(
          await slcFunctionService.runById({
            id: req.params.id,
          }),
        )
        .status(HttpCode.OK);
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

  fastify.route({
    method: HttpMethod.GET,
    url: `${SLCApiPath.SLC_FUNCTIONS}${SLCFunctionApiPath.$ID}`,
    async handler(
      req: FastifyRequest<{
        Params: SLCFunctionLoadParamsDto;
      }>,
      rep,
    ) {
      return rep
        .send(
          await slcFunctionService.loadById({
            id: req.params.id,
          }),
        )
        .status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: `${SLCApiPath.SLC_FUNCTIONS}${SLCFunctionApiPath.$ID}`,
    async handler(
      req: FastifyRequest<{ Params: SLCFunctionDeleteParamsDto }>,
      rep,
    ) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];
      const { userRole } = tokenService.decode<TokenPayload>(token);

      if (userRole !== UserRole.WORKER) {
        throw new SLCError({
          status: HttpCode.DENIED,
          message: ExceptionMessage.MASTER_FUNCTION_DELETE,
        });
      }

      await slcFunctionService.delete(req.params.id);

      return rep.send(true).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.PUT,
    url: `${SLCApiPath.SLC_FUNCTIONS}${SLCFunctionApiPath.$ID}`,
    async handler(
      req: FastifyRequest<{
        Params: SLCFunctionUpdateParamsDto;
        Body: SLCFunctionUpdateRequestDto;
      }>,
      rep,
    ) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];

      return rep
        .send(
          await slcFunctionService.updateById({
            id: req.params.id,
            sourceCode: req.body.sourceCode,
            token,
          }),
        )
        .status(HttpCode.OK);
    },
  });
};

export { initSLCApi };
