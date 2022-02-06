import {
  HttpCode,
  CustomExceptionName,
  CustomExceptionMessage,
} from '~/common/enums/enums';

class InvalidCredentialsError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.UNAUTHORIZED,
    message,
  }: {
    status?: HttpCode;
    message: CustomExceptionMessage;
  }) {
    super(message);
    this.status = status;
    this.name = CustomExceptionName.INVALID_CREDENTIALS;
  }
}

export { InvalidCredentialsError };
