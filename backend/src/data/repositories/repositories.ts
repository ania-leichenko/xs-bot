import {
  User as UserModel,
  Ticket as TicketModel,
} from '~/data/models/models';
import { UserRepository } from './user/user';
import { Ticket } from './ticket/ticket.repository';

const users = new UserRepository({ UserModel });
const ticket  = new Ticket({ TicketModel });

export { users, ticket  };
