import { FastifyRequest } from 'fastify';
import { Permission, HttpCode, ExceptionMessage } from '~/common/enums/enums';
import { HttpError } from '~/exceptions/exceptions';
import { checkHasPermission } from '~/helpers/helpers';
import { auth as authServ } from '~/services/services';

const checkHasPermissions =
  (...permissions: Permission[]) =>
  async (req: FastifyRequest): Promise<void> => {
    const [, token] = req.headers?.authorization?.split(' ') ?? [];
    const user = await authServ.getCurrentUser(token);

    const hasUser = Boolean(user);

    if (!hasUser) {
      throw new HttpError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.PERMISSION_LACK,
      });
    }

    const hasUserPermission = checkHasPermission(
      permissions,
      user?.user.permissions ?? [],
    );

    if (!hasUserPermission) {
      throw new HttpError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.PERMISSION_LACK,
      });
    }
  };

export { checkHasPermissions };
