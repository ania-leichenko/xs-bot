import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import {
  space as spaceServ,
  bsObject as bsObjectServ,
} from '~/services/services';
import {
  HttpCode,
  HttpMethod,
  BSApiPath,
  SpacesApiPath,
} from '~/common/enums/enums';
import {
  BSSpaceCreateRequestDto,
  BSSpaceDeleteParamsDto,
  BSSpaceGetRequestParamsDto,
  BSObjectDownloadParamsDto,
  BSObjectUploadParamsDto,
} from '~/common/types/types';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { bsSpaceCreate as bsSpaceCreateValidationSchema } from '~/validation-schemas/validation-schemas';
import { upload } from '~/middlewares/middlewares';

type Options = {
  services: {
    space: typeof spaceServ;
    bsObject: typeof bsObjectServ;
  };
};

const initBsApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { space: spaceService, bsObject: bsObjectService } = opts.services;

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
      return rep
        .send(
          await spaceService.create({
            name: req.body.name,
            token: req.user?.token as string,
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
      const spaces = await spaceService.getSpacesByTenant({
        query: req.query,
        token: req.user?.token as string,
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
      const { id } = req.params;

      await spaceService.delete({
        id,
        token: req.user?.token as string,
      });

      return rep.send(true).status(HttpCode.OK);
    },
  });

  fastify.route<{
    Params: BSObjectUploadParamsDto;
    File: File;
  }>({
    method: HttpMethod.POST,
    url: `${BSApiPath.SPACES}${SpacesApiPath.$ID_OBJECTS}`,
    preHandler: upload.single('file'),
    async handler(
      req: FastifyRequest<{ Params: BSObjectUploadParamsDto }>,
      rep,
    ) {
      const { id } = req.params;

      await bsObjectService.upload({
        token: req.user?.token as string,
        file: req.file,
        id,
      });

      return rep.send(true).status(HttpCode.OK);
    },
  });

  fastify.route<{
    Params: BSObjectDownloadParamsDto;
  }>({
    method: HttpMethod.GET,
    url: `${BSApiPath.SPACES}${SpacesApiPath.$SPACEID_OBJECTS_$OBJECTID}`,
    async handler(req, rep) {
      const { spaceId, objectId } = req.params;

      const object = await bsObjectService.download({
        token: req.user?.token as string,
        spaceId,
        objectId,
      });

      return rep.send(object).status(HttpCode.OK);
    },
  });
};

export { initBsApi };
