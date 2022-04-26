import {
  User as UserModel,
  PaidList as PaidListModel,
} from '~/data/models/models';
import { UserRepository } from './user/user';
import { PaidList } from './paid-list/paid-list.repository';

const users = new UserRepository({ UserModel });
const paidList = new PaidList({ PaidListModel });

export { users, paidList };
