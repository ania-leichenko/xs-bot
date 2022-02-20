import { ExceptionMessage, HttpCode } from '~/common/enums/enums';

const DEFAULT_MESSAGE = ExceptionMessage.FUNCTION_NAME_EXISTS;

class InvalidFunctionError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.BAD_REQUEST,
    message = DEFAULT_MESSAGE,
  } = {}) {
    super(message);
    this.status = status;
  }
}

export { InvalidFunctionError };
