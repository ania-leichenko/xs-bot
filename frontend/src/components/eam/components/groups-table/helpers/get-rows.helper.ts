import { GroupsTableAccessor } from 'common/enums/enums';
import { EAMGroupGetByTenantResponseItemDto } from 'common/types/types';

type Row = {
  [GroupsTableAccessor.GROUP_NAME]: string;
  [GroupsTableAccessor.USERS]: number;
  [GroupsTableAccessor.PERMISSIONS]: string;
  [GroupsTableAccessor.CREATION_TIME]: string;
};

const getRows = (groups: EAMGroupGetByTenantResponseItemDto[]): Row[] => {
  return groups.map((item) => {
    const { name, users, permissions, createdAt } = item;
    const permissionsContent = permissions.map((item) => item.name).join(', ');

    return {
      [GroupsTableAccessor.GROUP_NAME]: name,
      [GroupsTableAccessor.USERS]: users.length,
      [GroupsTableAccessor.PERMISSIONS]: permissionsContent,
      [GroupsTableAccessor.CREATION_TIME]: createdAt,
    };
  });
};

export { getRows };
