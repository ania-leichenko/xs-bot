import { master as masterRepository } from '~/data/repositories/repositories';
import { Master } from './master/master.service';

const master = new Master({
  masterRepository,
});

export { master };
