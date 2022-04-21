import {
  users as usersRepository,
} from '~/data/repositories/repositories';
import { UserService } from './user/user.service';

const users = new UserService({
  usersRepository,
});

export { users };
