import { CustomExceptionName, HttpCode } from '~/common/enums/enums';

const DEFAULT_MESSAGE = 'Network Error';

class HttpError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE,
    name = CustomExceptionName.HTTP_ERROR,
  } = {}) {
    super(message);
    this.status = status;
    this.name = name;
  }
}

export { HttpError };
