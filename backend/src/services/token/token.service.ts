import jwt, { Secret } from 'jsonwebtoken';
import { ENV } from '~/common/enums/app/env.enum';

class Token {
  create = (data: string): string =>
    jwt.sign({ data }, <Secret>ENV.JWT.SECRET, {
      expiresIn: ENV.JWT.EXPIRES_IN,
    });

  verify = (token: string): string | jwt.JwtPayload =>
    jwt.verify(token, <Secret>ENV.JWT.SECRET);
}

export { Token };
