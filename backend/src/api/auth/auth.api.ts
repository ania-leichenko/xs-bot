import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { auth as authService } from '~/services/services';
import { userSignUp as userSignUpValidationSchema } from '~/validation-schemas/validation-schemas';
import { UserCreatePayload } from '~/common/types/types';
import { HttpCode, HttpMethod, AuthApiPath } from '~/common/enums/enums';

type Options = {
  services: {
    auth: typeof authService;
  };
};

const initAuthApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { auth: authService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.SIGN_UP,
    schema: {
      body: userSignUpValidationSchema,
    },
    validatorCompiler({
      schema,
    }: FastifyRouteSchemaDef<typeof userSignUpValidationSchema>) {
      return (
        data: UserCreatePayload,
      ): ReturnType<typeof userSignUpValidationSchema['validate']> => {
        return schema.validate(data);
      };
    },
    async handler(req: FastifyRequest<{ Body: UserCreatePayload }>, rep) {
      const user = await authService.signUp(req.body);

      return rep.send(user).status(HttpCode.CREATED);
    },
  });
};

export { initAuthApi };
