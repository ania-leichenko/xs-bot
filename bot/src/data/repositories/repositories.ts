import {
  User as UserModel,
  UserMessage as UserMessageModel,
  Ticket as TicketModel,
  Channel as ChannelModel,
  ChannelMessage as ChannelMessageModel,
  BotMessage as BotMessageModel,
} from '~/data/models/models';
import { User } from './user/user.repository';
import { UserMessage } from './user-message/user-message.repository';
import { Ticket } from './ticket/ticket.repository';
import { Channel } from './channel/channel.repository';
import { ChannelMessage } from './channel-message/channel-message.repository';
import { BotMessage } from './bot-message/bot-message.repository';

const user = new User({ UserModel });
const userMessage = new UserMessage({ UserMessageModel });
const ticket = new Ticket({ TicketModel });
const channel = new Channel({ ChannelModel });
const channelMessage = new ChannelMessage({ ChannelMessageModel });
const botMessage = new BotMessage({ BotMessageModel });

export { user, userMessage, ticket, channel, channelMessage, botMessage };
