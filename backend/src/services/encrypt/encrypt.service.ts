import { hash, genSaltSync } from 'bcrypt';
import { MASTER_PASSWORD_SALT_ROUNDS as saltRounds } from '~/common/constants/master.constants';

class Encrypt {
  saltRounds: number;

  constructor(rounds?: number) {
    this.saltRounds = rounds || saltRounds;
  }

  createSalt = (): string => genSaltSync(this.saltRounds);

  createHash = (data: string, salt: string): Promise<string> =>
    hash(data, salt);
}

export { Encrypt };
