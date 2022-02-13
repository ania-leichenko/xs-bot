import { ExceptionMessage, HttpCode } from '~/common/enums/enums';

const DEFAULT_MESSAGE = ExceptionMessage.USER_EXISTS;

class InvalidCredentialsError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.UNAUTHORIZED,
    message = DEFAULT_MESSAGE,
  } = {}) {
    super(message);
    this.status = status;
  }
}

export { InvalidCredentialsError };
