import jwt, { Secret } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { ENV } from '~/common/enums/app/env.enum';

type decoded = {
  'data': string;
  'iat': number;
  'exp': number;
};

class Token {
  create = (data: string): string =>
    jwt.sign({ data }, <Secret>ENV.JWT.SECRET, {
      expiresIn: ENV.JWT.EXPIRES_IN,
    });
  decode = (token: string): decoded => {
    return jwt_decode(token);
  };
}

export { Token };
