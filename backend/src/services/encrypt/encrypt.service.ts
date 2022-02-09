import { hash, genSalt } from 'bcrypt';
import { MASTER_PASSWORD_SALT_ROUNDS } from '~/common/constants/master.constants';

class Encrypt {
  #saltRounds: number;

  constructor(rounds?: number) {
    this.#saltRounds = rounds ?? MASTER_PASSWORD_SALT_ROUNDS;
  }

  createSalt = (): Promise<string> => genSalt(this.#saltRounds);

  createHash = (data: string, salt: string): Promise<string> =>
    hash(data, salt);

  compare = async (
    data: string,
    salt: string,
    passwordHash: string,
  ): Promise<boolean> => {
    const hash = await this.createHash(data, salt);

    return hash === passwordHash;
  };
}

export { Encrypt };
