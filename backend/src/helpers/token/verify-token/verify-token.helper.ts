import jwt, { Secret } from 'jsonwebtoken';
import { ENV } from '../../../common/enums/enums';

const verifyToken = (token: string): string | jwt.JwtPayload =>
  jwt.verify(token, <Secret>ENV.JWT.SECRET);

export { verifyToken };
