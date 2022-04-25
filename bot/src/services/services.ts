import {
  user as userRepository,
  userMessage as userMessageRepository,
  paidList as paidListRepository,
} from '~/data/repositories/repositories';
import { User } from './user/user.service';
import { BotServ } from './bot/bot.service';
import { UserMessage } from './user-message/user-message.service';
import { PaidList } from './paid-list/paid-list.service';

const user = new User({
  userRepository,
});

const userMessage = new UserMessage({
  userMessageRepository,
});

const paidList = new PaidList({
  paidListRepository,
});

const botServ = new BotServ({
  userService: user,
  userMessageService: userMessage,
  paidListService: paidList,
});

export { user, botServ, userMessage, paidList };
