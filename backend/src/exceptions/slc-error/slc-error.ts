import { ExceptionMessage, HttpCode } from '~/common/enums/enums';

type Constructor = {
  status?: HttpCode;
  message?: string;
};

class SLCError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.BAD_REQUEST,
    message = ExceptionMessage.FUNCTION_NAME_EXISTS,
  }: Constructor = {}) {
    super(message);
    this.status = status;
  }
}

export { SLCError };
