import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import {
  space as spaceServ,
  bsObject as bsObjectServ,
  token as tokenServ,
} from '~/services/services';
import {
  HttpCode,
  HttpMethod,
  BSApiPath,
  SpacesApiPath,
  UserRole,
  ExceptionMessage,
} from '~/common/enums/enums';
import {
  BSSpaceCreateRequestDto,
  BSSpaceDeleteParamsDto,
  BSSpaceGetRequestParamsDto,
  ObjectUploadParamsDto,
  TokenPayload,
} from '~/common/types/types';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { bsSpaceCreate as bsSpaceCreateValidationSchema } from '~/validation-schemas/validation-schemas';
import { upload } from '~/middlewares/middlewares';
import { BsError } from '~/exceptions/exceptions';

type Options = {
  services: {
    space: typeof spaceServ;
    bsObject: typeof bsObjectServ;
    token: typeof tokenServ;
  };
};

const initBsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const {
    space: spaceService,
    bsObject: bsObjectService,
    token: tokenService,
  } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: BSApiPath.SPACES,
    schema: {
      body: bsSpaceCreateValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof bsSpaceCreateValidationSchema>) {
      return (
        data: BSSpaceCreateRequestDto,
      ): ReturnType<typeof bsSpaceCreateValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
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

  fastify.route({
    method: HttpMethod.GET,
    url: BSApiPath.SPACES,
    async handler(
      req: FastifyRequest<{ Querystring: BSSpaceGetRequestParamsDto }>,
      rep,
    ) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];

      const spaces = await spaceService.getSpacesByTenant({
        query: req.query,
        token,
      });

      return rep.send(spaces).status(HttpCode.OK);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: `${BSApiPath.SPACES}${SpacesApiPath.$ID}`,
    async handler(
      req: FastifyRequest<{ Params: BSSpaceDeleteParamsDto }>,
      rep,
    ) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];
      const { id } = req.params;
      const user: TokenPayload = await tokenService.decode(token);

      if (user.userRole !== UserRole.WORKER) {
        throw new BsError({
          status: HttpCode.DENIED,
          message: ExceptionMessage.MASTER_SPACE_DELETE,
        });
      }

      await spaceService.delete(id);

      return rep.send(true).status(HttpCode.OK);
    },
  });

  fastify.route<{
    Params: ObjectUploadParamsDto;
    File: File;
  }>({
    method: HttpMethod.POST,
    url: `${BSApiPath.SPACES}${SpacesApiPath.$ID_OBJECTS}`,
    preHandler: upload.single('file'),
    async handler(req: FastifyRequest<{ Params: ObjectUploadParamsDto }>, rep) {
      const [, token] = req.headers?.authorization?.split(' ') ?? [];
      const { id } = req.params;

      await bsObjectService.upload({
        token,
        file: req.file,
        id,
      });
      return rep.send(true).status(HttpCode.OK);
    },
  });
};

export { initBsApi };
