import { EAMWorkerGroupsItem } from './eam-worker-groups-item.type';

type EAMWorkerGetAllItemResponseDto = {
  id: string;
  name: string;
  createdAt: string;
  groups: EAMWorkerGroupsItem[];
};

export { type EAMWorkerGetAllItemResponseDto };
