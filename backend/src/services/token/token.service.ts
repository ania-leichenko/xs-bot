import jwt, { Secret } from 'jsonwebtoken';
import { ENV } from '~/common/enums/app/env.enum';

class Token {
  create = (data: string): string =>
    jwt.sign({ data }, <Secret>ENV.JWT.SECRET, {
      expiresIn: ENV.JWT.EXPIRES_IN,
    });

  decode = <T>(data: string): T => {
    const token = data.split(' ');
    return jwt.decode(token[1]) as T;
  };
}

export { Token };
