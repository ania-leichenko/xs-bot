import jwt, { Secret } from 'jsonwebtoken';
import { ENV } from '~/common/enums/app/env.enum';

class TokenService {
  create = (data: string): string =>
    jwt.sign({ data }, <Secret>ENV.JWT.SECRET, {
      expiresIn: ENV.JWT.EXPIRES_IN,
    });
}

export { TokenService };
