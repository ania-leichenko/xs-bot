import {
  users as usersRepository,
  ticket as ticketRepository,
} from '~/data/repositories/repositories';
import { UserService } from './user/user.service';
import { Ticket } from './ticket/ticket.service';

const users = new UserService({
  usersRepository,
});

const ticket = new Ticket({
  ticketRepository,
});

export { users, ticket };
