import { EAMGroupRelatedItem } from '~/common/types/eam-group/eam-group-related-item.type';

type EamGroupGetByIdItem = {
  id: string;
  name: string;
  createdAt: string;
  users: EAMGroupRelatedItem[];
  permissions: EAMGroupRelatedItem[];
};

export { type EamGroupGetByIdItem };
