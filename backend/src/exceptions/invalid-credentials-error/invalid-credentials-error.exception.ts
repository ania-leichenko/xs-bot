import { ExceptionMessage, ExceptionName } from '../../common/enums/enums';

class InvalidCredentialsErrorException extends Error {
  constructor(message = ExceptionMessage.INCORRECT_EMAIL) {
    super(message);
    this.name = ExceptionName.INVALID_CREDENTIALS;
  }
}

export { InvalidCredentialsErrorException };
