import { master as masterRepository } from '~/data/repositories/repositories';
import { Master } from './master/master.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Token } from '~/services/token/token.service';

const token = new Token();
const encrypt = new Encrypt();

const master = new Master({
  masterRepository,
  token,
  encrypt,
});

export { master, token, encrypt };
