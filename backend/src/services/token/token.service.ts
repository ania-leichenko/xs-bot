import jwt, { Secret } from 'jsonwebtoken';
import { ENV } from '~/common/enums/app/env.enum';

class Token {
  create = (data: string): string =>
    jwt.sign({ data }, <Secret>ENV.JWT.SECRET, {
      expiresIn: ENV.JWT.EXPIRES_IN,
    });

  decode = <T>(token: string): T => {
    return jwt.decode(token) as T;
  };
}

export { Token };
