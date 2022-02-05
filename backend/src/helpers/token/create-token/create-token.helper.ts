import jwt, { Secret } from 'jsonwebtoken';
import { ENV } from '~/common/enums/app/env.enum';

const createToken = (data: string): string =>
  jwt.sign(data, <Secret>ENV.JWT.SECRET, { expiresIn: ENV.JWT.EXPIRES_IN });

export { createToken };
