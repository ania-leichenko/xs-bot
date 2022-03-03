import { ExceptionMessage, HttpCode } from '~/common/enums/enums';

type Constructor = {
  status?: HttpCode;
  message?: string;
};

const DEFAULT_MESSAGE = ExceptionMessage.GROUP_EXISTS;

class EamError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.BAD_REQUEST,
    message = DEFAULT_MESSAGE,
  }: Constructor = {}) {
    super(message);
    this.status = status;
  }
}

export { EamError };
