import { HttpCode } from '~/common/enums/enums';

type Constructor = {
  status: HttpCode;
  message: string;
};

class SCError extends Error {
  status: HttpCode;

  constructor({ status, message }: Constructor) {
    super(message);
    this.status = status;
  }
}

export { SCError };
