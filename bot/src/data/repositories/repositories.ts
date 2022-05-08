import {
  User as UserModel,
  Ticket as TicketModel,
  Channel as ChannelModel,
  ChannelMessage as ChannelMessageModel,
  BotMessage as BotMessageModel,
} from '~/data/models/models';
import { User } from './user/user.repository';
import { Ticket } from './ticket/ticket.repository';
import { Channel } from './channel/channel.repository';
import { ChannelMessage } from './channel-message/channel-message.repository';
import { BotMessage } from './bot-message/bot-message.repository';

const user = new User({ UserModel });
const ticket = new Ticket({ TicketModel });
const channel = new Channel({ ChannelModel });
const channelMessage = new ChannelMessage({ ChannelMessageModel });
const botMessage = new BotMessage({ BotMessageModel });

export { user, ticket, channel, channelMessage, botMessage };
