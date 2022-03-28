import { FastifyRequest } from 'fastify';
import { ExceptionMessage, HttpCode, UserRole } from '~/common/enums/enums';
import { TokenPayload } from '~/common/types/types';
import { HttpError } from '~/exceptions/exceptions';
import { token as tokenService } from '~/services/services';

const checkRole =
  (role: UserRole) =>
  async (req: FastifyRequest): Promise<void> => {
    const token = req.user?.token as string;
    const { userRole } = tokenService.decode<TokenPayload>(token);
    const isCorrectRole = role === userRole;

    if (!isCorrectRole) {
      throw new HttpError({
        status: HttpCode.DENIED,
        message: ExceptionMessage.USER_ROLE,
      });
    }
  };

export { checkRole };
