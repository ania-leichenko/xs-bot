import { GroupsTableAccessor } from 'common/enums/enums';
import {
  EAMGroupGetByTenantResponseItemDto,
  EAMGroupGetByTenantItem,
} from 'common/types/types';

type Row = {
  [GroupsTableAccessor.GROUP_NAME]: string;
  [GroupsTableAccessor.USERS]: number;
  [GroupsTableAccessor.PERMISSIONS]: string;
  [GroupsTableAccessor.CREATION_TIME]: Date;
};

const getRows = (groups: EAMGroupGetByTenantResponseItemDto[]): Row[] => {
  return groups.map((item) => {
    const { name, users, permissions, createdAt } = item;
    const permissionsContent = (permissions as EAMGroupGetByTenantItem[])
      .map((item) => item.name)
      .join(', ');

    return {
      [GroupsTableAccessor.GROUP_NAME]: name,
      [GroupsTableAccessor.USERS]: (users as EAMGroupGetByTenantItem[]).length,
      [GroupsTableAccessor.PERMISSIONS]: permissionsContent,
      [GroupsTableAccessor.CREATION_TIME]: createdAt,
    };
  });
};

export { getRows };
