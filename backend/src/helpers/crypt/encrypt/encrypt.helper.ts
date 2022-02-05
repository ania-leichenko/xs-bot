import { hash, genSaltSync } from 'bcrypt';

const createSalt = (saltRounds: number): string => genSaltSync(saltRounds);
const encrypt = (data: string, salt: string): Promise<string> =>
  hash(data, salt);

export { createSalt, encrypt };
