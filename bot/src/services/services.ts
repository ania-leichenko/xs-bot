import {
  user as userRepository,
  userMessage as userMessageRepository,
} from '~/data/repositories/repositories';
import { User } from './user/user.service';
import { BotServ } from './bot/bot.service';
import { UserMessage } from './user-message/user-message.service';

const user = new User({
  userRepository,
});

const userMessage = new UserMessage({
  userMessageRepository,
});

const botServ = new BotServ({
  userService: user,
  userMessageService: userMessage,
});

export { user, botServ, userMessage };
