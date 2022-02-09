import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { ENV } from '~/common/enums/app/env.enum';

class Token {
  public create = (data: string): string =>
    jwt.sign({ data }, <Secret>ENV.JWT.SECRET, {
      expiresIn: ENV.JWT.EXPIRES_IN,
    });

  public verify = (token: string): JwtPayload | string =>
    jwt.verify(token, <Secret>ENV.JWT.SECRET);
}

export { Token };
