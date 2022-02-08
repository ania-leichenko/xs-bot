import { HttpCode } from '~/common/enums/enums';

class InvalidCredentialsError extends Error {
  status: HttpCode;

  constructor(message: string, status: HttpCode) {
    super(message);
    this.status = status;
  }
}

export { InvalidCredentialsError };
