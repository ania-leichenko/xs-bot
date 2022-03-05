import { ExceptionMessage, HttpCode } from '~/common/enums/enums';

type Constructor = {
  status?: HttpCode;
  message?: string;
};

const DEFAULT_MESSAGE = ExceptionMessage.TENANT_NAME_EXISTS;

class TenantError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.DENIED,
    message = DEFAULT_MESSAGE,
  }: Constructor = {}) {
    super(message);
    this.status = status;
  }
}

export { TenantError };
