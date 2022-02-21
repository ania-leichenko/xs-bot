import { ExceptionMessage, HttpCode } from '~/common/enums/enums';

const DEFAULT_MESSAGE = ExceptionMessage.MASTER_SPACE_CREATE;

class BsError extends Error {
  status: HttpCode;

  constructor({ status = HttpCode.DENIED, message = DEFAULT_MESSAGE } = {}) {
    super(message);
    this.status = status;
  }
}

export { BsError };
