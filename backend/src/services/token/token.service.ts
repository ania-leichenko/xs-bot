import jwt, { Secret } from 'jsonwebtoken';
import { ENV } from '~/common/enums/app/env.enum';
import jwtDecode from 'jwt-decode';

class Token {
  create = (data: string): string =>
    jwt.sign({ data }, <Secret>ENV.JWT.SECRET, {
      expiresIn: ENV.JWT.EXPIRES_IN,
    });

  decode = <T>(token: string): T => {
    return jwtDecode<T>(token);
  };
}

export { Token };
