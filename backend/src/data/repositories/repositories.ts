import { MasterModel } from '~/data/models/models';
import { MasterRepository } from './master/master.repository';

const masterRepository = new MasterRepository({
  MasterModel,
});

export { masterRepository };
