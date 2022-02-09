import { hash } from 'bcrypt';

type Constructor = {
  salt: string;
};

class Encrypt {
  #saltRounds: string;

  constructor({ salt }: Constructor) {
    this.#saltRounds = salt;
  }

  get saltRounds(): string {
    return this.#saltRounds;
  }

  createHash = (data: string, salt: string): Promise<string> => {
    return hash(data, salt);
  };

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
