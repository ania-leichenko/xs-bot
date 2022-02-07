import { hash, genSaltSync } from 'bcrypt';
import { MASTER_PASSWORD_SALT_ROUNDS } from '~/common/constants/master.constants';

class Encrypt {
  saltRounds: number;

  constructor(rounds?: number) {
    this.saltRounds = rounds ?? MASTER_PASSWORD_SALT_ROUNDS;
  }

  createSalt = (): string => genSaltSync(this.saltRounds);

  createHash = (data: string, salt: string): Promise<string> =>
    hash(data, salt);
}

export { Encrypt };
