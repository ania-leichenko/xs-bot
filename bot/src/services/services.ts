import {
  user as userRepository,
} from '~/data/repositories/repositories';
import { User } from './user/user.service';
import { BotServ } from './bot/bot.service';

const user = new User({
  userRepository,
});

const botServ = new BotServ({
  userService: user,
});

export { user, botServ };
