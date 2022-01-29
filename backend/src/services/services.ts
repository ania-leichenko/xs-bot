import { masterRepository } from '~/data/repositories/repositories';
import { MasterService } from './master/master.service';

const masterService = new MasterService({
  masterRepository,
});

export { masterService };
