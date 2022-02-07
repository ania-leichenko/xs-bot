import { master as masterRepository } from '~/data/repositories/repositories';
import { Master } from './master/master.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Token } from '~/services/token/token.service';

const tokenService = new Token();
const encryptService = new Encrypt();

const master = new Master({
  masterRepository,
  tokenService,
  encryptService,
});

export { master, tokenService, encryptService };
