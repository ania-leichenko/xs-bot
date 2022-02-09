import { HttpCode, ExceptionMessage } from '~/common/enums/enums';

class InvalidCredentialsError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.UNAUTHORIZED,
    message = ExceptionMessage.EMAIL_ALREADY_EXISTS,
  } = {}) {
    super(message);
    this.status = status;
  }
}

export { InvalidCredentialsError };
