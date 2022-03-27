import { FastifyRequest } from 'fastify';
import { HttpCode, ExceptionMessage, Permission } from '~/common/enums/enums';
import { HttpError } from '~/exceptions/exceptions';
import { checkHasPermission } from '~/helpers/helpers';
import { EAMWorkerByIdResponseDto } from '~/common/types/types';

type User = {
  user: EAMWorkerByIdResponseDto;
};

const checkHasPermissions =
  (...permissions: Permission[]) =>
  async <T extends FastifyRequest>(req: T): Promise<void> => {
    const { user: userData } = req;

    const hasUser = Boolean(userData);

    if (!hasUser) {
      throw new HttpError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.PERMISSION_LACK,
      });
    }

    const hasUserPermission = checkHasPermission(
      permissions,
      (<User>userData).user.permissions ?? [],
    );

    if (!hasUserPermission) {
      throw new HttpError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.PERMISSION_LACK,
      });
    }
  };

export { checkHasPermissions };
