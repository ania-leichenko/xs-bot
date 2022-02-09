import { hash, genSalt } from 'bcrypt';
import { MASTER_PASSWORD_SALT_ROUNDS } from '~/common/constants/master.constants';

class EncryptService {
  #saltRounds: number;

  constructor(rounds?: number) {
    this.#saltRounds = rounds ?? MASTER_PASSWORD_SALT_ROUNDS;
  }

  createSalt = (): Promise<string> => genSalt(this.#saltRounds);

  createHash = (data: string, salt: string): Promise<string> =>
    hash(data, salt);
}

export { EncryptService };
