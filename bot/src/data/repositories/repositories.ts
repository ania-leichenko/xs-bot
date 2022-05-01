import {
  User as UserModel,
  UserMessage as UserMessageModel,
  PaidList as PaidListModel,
  Channel as ChannelModel,
  ChannelMessage as ChannelMessageModel,
  BotMessage as BotMessageModel,
} from '~/data/models/models';
import { User } from './user/user.repository';
import { UserMessage } from './user-message/user-message.repository';
import { PaidList } from './paid-list/paid-list.repository';
import { Channel } from './channel/channel.repository';
import { ChannelMessage } from './channel-message/channel-message.repository';
import { BotMessage } from './bot-message/bot-message.repository';

const user = new User({ UserModel });
const userMessage = new UserMessage({ UserMessageModel });
const paidList = new PaidList({ PaidListModel });
const channel = new Channel({ ChannelModel });
const channelMessage = new ChannelMessage({ ChannelMessageModel });
const botMessage = new BotMessage({ BotMessageModel });

export { user, userMessage, paidList, channel, channelMessage, botMessage };
