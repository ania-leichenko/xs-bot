import { hash, genSalt, compare } from 'bcrypt';
import { MASTER_PASSWORD_SALT_ROUNDS } from '~/common/constants/master.constants';

class Encrypt {
  #saltRounds: number;

  constructor(rounds?: number) {
    this.#saltRounds = rounds ?? MASTER_PASSWORD_SALT_ROUNDS;
  }

  createSalt = (): Promise<string> => genSalt(this.#saltRounds);

  createHash = (data: string, salt: string): Promise<string> =>
    hash(data, salt);

  cryptCompare = (data: string | Buffer, encrypted: string): Promise<boolean> =>
    compare(data, encrypted);
}

export { Encrypt };
