import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { slcFunction as slcFunctionServ } from '~/services/services';
import { slcFunctionCreate as slcFunctionCreateValidationSchema } from '~/validation-schemas/validation-schemas';
import {
  HttpCode,
  HttpMethod,
  SLCApiPath,
  SLCFunctionApiPath,
} from '~/common/enums/enums';
import {
  SLCFunctionCreateRequestDto,
  SLCFunctionGetRequestParamsDto,
  SLCFunctionDeleteParamsDto,
  SLCFunctionUpdateParamsDto,
  SLCFunctionUpdateRequestDto,
  SLCFunctionLoadParamsDto,
  SLCFunctionRunParamsDto,
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
      return rep
        .send(
          await slcFunctionService.create({
            name: req.body.name,
            token: req.user?.token as string,
          }),
        )
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
      const slcFunctions = await slcFunctionService.getSLCFunctionsByTenant({
        query: req.query,
        token: req.user?.token as string,
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
      await slcFunctionService.delete({
        id: req.params.id,
        token: req.user?.token as string,
      });

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
      return rep
        .send(
          await slcFunctionService.updateById({
            id: req.params.id,
            sourceCode: req.body.sourceCode,
            token: req.user?.token as string,
          }),
        )
        .status(HttpCode.OK);
    },
  });
};

export { initSLCApi };
