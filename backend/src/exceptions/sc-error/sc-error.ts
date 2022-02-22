import { ExceptionMessage, HttpCode } from '~/common/enums/enums';

const DEFAULT_MESSAGE = ExceptionMessage.MASTER_INSTANCE_CREATE;

class SCError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.BAD_REQUEST,
    message = DEFAULT_MESSAGE,
  } = {}) {
    super(message);
    this.status = status;
  }
}

export { SCError };
