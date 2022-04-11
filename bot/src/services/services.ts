import {
  user as userRepository,
} from '~/data/repositories/repositories';
import { User } from './user/user.service';

const user = new User({
  userRepository,
});

export { user };
