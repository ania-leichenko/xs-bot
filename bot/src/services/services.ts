import {
  user as userRepository,
  userMessage as userMessageRepository,
  paidList as paidListRepository,
  channel as channelRepository,
  channelMessage as channelMessageRepository,
  botMessage as botMessageRepository,
} from '~/data/repositories/repositories';
import { User } from './user/user.service';
import { BotServ } from './bot/bot.service';
import { UserMessage } from './user-message/user-message.service';
import { PaidList } from './paid-list/paid-list.service';
import { Channel } from './channels/channel.service';
import { ChannelMessage } from './channel-message/channel-message.service';
import { BotMessage } from './bot-message/bot-message.service';

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

const channelMessage = new ChannelMessage({
  channelMessageRepository,
});

const botMessage = new BotMessage({
  botMessageRepository,
});

const botServ = new BotServ({
  userService: user,
  userMessageService: userMessage,
  paidListService: paidList,
  channelService: channel,
});

export {
  user,
  botServ,
  userMessage,
  paidList,
  channel,
  channelMessage,
  botMessage,
};
