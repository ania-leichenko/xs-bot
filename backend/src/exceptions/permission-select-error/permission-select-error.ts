import { HttpCode } from '~/common/enums/enums';

const DEFAULT_MESSAGE = 'Permission not selected';

class PermissionSelectError extends Error {
  status: HttpCode;

  constructor({
    status = HttpCode.BAD_REQUEST,
    message = DEFAULT_MESSAGE,
  } = {}) {
    super(message);
    this.status = status;
  }
}

export { PermissionSelectError };
