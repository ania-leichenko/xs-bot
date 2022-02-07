import { HttpCode } from '~/common/enums/enums';

const DEFAULT_MESSAGE = 'User already exists';

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
