import {
  User as UserModel,
  UserMessage as UserMessageModel,
} from '~/data/models/models';
import { User } from './user/user.repository';
import { UserMessage } from './user-message/user-message.repository';

const user = new User({ UserModel });
const userMessage = new UserMessage({ UserMessageModel });

export { user, userMessage };
