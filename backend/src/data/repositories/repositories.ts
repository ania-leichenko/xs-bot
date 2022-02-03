import { Master as MasterModel } from '~/data/models/models';
import { Master } from './master/master.repository';

const master = new Master({
  MasterModel,
});

export { master };
