import {
  Master as MasterModel,
  Group as GroupModel,
} from '~/data/models/models';
import { Master } from './master/master.repository';
import { Group } from './group/group.repository';

const master = new Master({
  MasterModel,
});

const group = new Group({
  GroupModel,
});

export { master, group };
