import { master as masterRepository } from '~/data/repositories/repositories';
import { Master } from './master/master.service';
import { Encrypt } from './encrypt/encrypt.service';

const master = new Master({
  masterRepository,
});

const encrypt = new Encrypt();

export { master, encrypt };
