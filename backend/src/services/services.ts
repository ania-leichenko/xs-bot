import { master as masterRepository } from '~/data/repositories/repositories';
import { Master } from './master/master.service';
import { Encrypt } from './encrypt/encrypt.service';

const encryptService = new Encrypt();

const master = new Master({
  masterRepository,
  encryptService,
});

export { master, encryptService };
