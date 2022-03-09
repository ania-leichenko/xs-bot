import { ExceptionMessage, HttpCode } from '~/common/enums/enums';

type Constructor = {
  status?: HttpCode;
  message?: string;
};

const DEFAULT_MESSAGE = ExceptionMessage.WORKER_DELETE_WORKER;

class EAMError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.DENIED,
    message = DEFAULT_MESSAGE,
  }: Constructor = {}) {
    super(message);
    this.status = status;
  }
}

export { EAMError };
