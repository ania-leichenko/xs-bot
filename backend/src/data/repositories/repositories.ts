import {
  User as UserModel,
  Ticket as TicketModel,
  MessageForUsers as MessageForUsersModel,
  MessageFromBot as MessageFromBotModel,
} from '~/data/models/models';
import { UserRepository } from './user/user';
import { Ticket } from './ticket/ticket.repository';
import { MessageForUsers } from './message-for-users/message-for-users.repository';
import { MessageFromBot } from './message-from-bot/message-from-bot.repository';

const users = new UserRepository({ UserModel });
const ticket = new Ticket({ TicketModel });
const messageForUsers = new MessageForUsers({ MessageForUsersModel });
const messageFromBot = new MessageFromBot({ MessageFromBotModel });

export { users, ticket, messageForUsers, messageFromBot };
