import {
  user as userRepository,
  ticket as ticketRepository,
  channel as channelRepository,
  channelMessage as channelMessageRepository,
  botMessage as botMessageRepository,
} from '~/data/repositories/repositories';
import { User } from './user/user.service';
import { BotServ } from './bot/bot.service';
import { Ticket } from './ticket/ticket.service';
import { Channel } from './channels/channel.service';
import { ChannelMessage } from './channel-message/channel-message.service';
import { BotMessage } from './bot-message/bot-message.service';

const user = new User({
  userRepository,
});

const ticket = new Ticket({
  ticketRepository,
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
  ticketService: ticket,
  channelService: channel,
});

export {
  user,
  botServ,
  ticket,
  channel,
  channelMessage,
  botMessage,
};
