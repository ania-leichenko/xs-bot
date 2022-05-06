import {
  User as UserModel,
  Ticket as TicketModel,
  MessageForUsers as MessageForUsersModel,
} from '~/data/models/models';
import { UserRepository } from './user/user';
import { Ticket } from './ticket/ticket.repository';
import { MessageForUsers } from './message-for-users/message-for-users.repository';

const users = new UserRepository({ UserModel });
const ticket  = new Ticket({ TicketModel });
const messageForUsers = new MessageForUsers({ MessageForUsersModel });

export { users, ticket, messageForUsers };
