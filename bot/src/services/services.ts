import {
  user as userRepository,
  userMessage as userMessageRepository,
  paidList as paidListRepository,
  channel as channelRepository,
} from '~/data/repositories/repositories';
import { User } from './user/user.service';
import { BotServ } from './bot/bot.service';
import { UserMessage } from './user-message/user-message.service';
import { PaidList } from './paid-list/paid-list.service';
import { Channel } from './channels/channel.service';

const user = new User({
  userRepository,
});

const userMessage = new UserMessage({
  userMessageRepository,
});

const paidList = new PaidList({
  paidListRepository,
});

const channel = new Channel({
  channelRepository,
});

const botServ = new BotServ({
  userService: user,
  userMessageService: userMessage,
  paidListService: paidList,
  channelService: channel,
});

export { user, botServ, userMessage, paidList, channel };
