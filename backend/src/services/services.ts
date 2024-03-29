import {
  users as usersRepository,
  ticket as ticketRepository,
  messageForUsers as messageForUsersRepository,
  messageFromBot as messageFromBotRepository,
} from '~/data/repositories/repositories';
import { UserService } from './user/user.service';
import { Ticket } from './ticket/ticket.service';
import { MessageForUsers } from './message-for-users/message-for-users.service';
import { GoogleDrive } from './google-drive/google-drive.service';
import { MessageFromBot } from './message-from-bot/message-from-bot.service';

const users = new UserService({
  usersRepository,
});

const messageForUsers = new MessageForUsers({
  messageForUsersRepository,
});

const ticket = new Ticket({
  ticketRepository,
});

const messageFromBot = new MessageFromBot({
  messageFromBotRepository,
});

const googleDrive = new GoogleDrive();

export { users, ticket, messageForUsers, googleDrive, messageFromBot };
