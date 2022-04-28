import {
  User as UserModel,
  UserMessage as UserMessageModel,
  PaidList as PaidListModel,
  Channel as ChannelModel,
} from '~/data/models/models';
import { User } from './user/user.repository';
import { UserMessage } from './user-message/user-message.repository';
import { PaidList } from './paid-list/paid-list.repository';
import { Channel } from './channel/channel.repository';

const user = new User({ UserModel });
const userMessage = new UserMessage({ UserMessageModel });
const paidList = new PaidList({ PaidListModel });
const channel = new Channel({ ChannelModel });

export { user, userMessage, paidList, channel };
