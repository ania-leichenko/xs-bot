import {
  User as UserModel,
} from '~/data/models/models';
import { UserRepository } from './user/user';

const users = new UserRepository({ UserModel });

export { users };
