import {
  User as UserModel,
  UserMessage as UserMessageModel,
  PaidList as PaidListModel,
} from '~/data/models/models';
import { User } from './user/user.repository';
import { UserMessage } from './user-message/user-message.repository';
import { PaidList } from './paid-list/paid-list.repository';

const user = new User({ UserModel });
const userMessage = new UserMessage({ UserMessageModel });
const paidList = new PaidList({ PaidListModel });

export { user, userMessage, paidList };
