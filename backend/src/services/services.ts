import { user as userRepository } from '~/data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { User } from './user/user.service';

const auth = new Auth({
  userRepository,
});

const user = new User({
  userRepository,
});

export { auth, user };
