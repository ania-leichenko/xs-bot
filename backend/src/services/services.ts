import {
  users as usersRepository,
  paidList as paidListRepository,
} from '~/data/repositories/repositories';
import { UserService } from './user/user.service';
import { PaidList } from './paid-list/paid-list.service';

const users = new UserService({
  usersRepository,
});

const paidList = new PaidList({
  paidListRepository,
});

export { users, paidList };
