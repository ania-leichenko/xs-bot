import { master as masterRepository } from '~/data/repositories/repositories';
import { group as groupRepository } from '~/data/repositories/repositories';
import { Master } from './master/master.service';
import { Group } from '~/services/group/group.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Token } from '~/services/token/token.service';

const token = new Token();
const encrypt = new Encrypt();

const master = new Master({
  masterRepository,
  token,
  encrypt,
});

const group = new Group({
  groupRepository,
});

export { master, group, token, encrypt };
