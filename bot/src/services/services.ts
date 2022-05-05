import {
  user as userRepository,
  userMessage as userMessageRepository,
  ticket as ticketRepository,
  channel as channelRepository,
  channelMessage as channelMessageRepository,
  botMessage as botMessageRepository,
} from '~/data/repositories/repositories';
import { User } from './user/user.service';
import { BotServ } from './bot/bot.service';
import { UserMessage } from './user-message/user-message.service';
import { Ticket } from './ticket/ticket.service';
import { Channel } from './channels/channel.service';
import { ChannelMessage } from './channel-message/channel-message.service';
import { BotMessage } from './bot-message/bot-message.service';

const user = new User({
  userRepository,
});

const userMessage = new UserMessage({
  userMessageRepository,
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
  userMessageService: userMessage,
  ticketService: ticket,
  channelService: channel,
});

export {
  user,
  botServ,
  userMessage,
  ticket,
  channel,
  channelMessage,
  botMessage,
};
