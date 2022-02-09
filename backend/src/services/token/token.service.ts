import jwt, { Secret } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { ENV } from '~/common/enums/app/env.enum';

class Token {
  create = (data: string): string =>
    jwt.sign({ data }, <Secret>ENV.JWT.SECRET, {
      expiresIn: ENV.JWT.EXPIRES_IN,
    });
  decode = (token: string): object => {
    return jwt_decode(token);
  };
}

export { Token };
