import { GroupsTableAccessor } from 'common/enums/enums';
import { EAMGroupGetByTenantResponseDto } from 'common/types/types';

type Row = {
  [GroupsTableAccessor.GROUP_NAME]: string;
  [GroupsTableAccessor.USERS]: number;
  [GroupsTableAccessor.PERMISSIONS]: string;
  [GroupsTableAccessor.CREATION_TIME]: string;
};

const getRows = (groups: EAMGroupGetByTenantResponseDto[]): Row[] => {
  const rows: Row[] = [];

  groups.forEach((item) => {
    const { name, users, permissions, createdAt } = item;
    const permissionsContent = permissions.map((item) => item.name).join(', ');

    rows.push({
      [GroupsTableAccessor.GROUP_NAME]: name,
      [GroupsTableAccessor.USERS]: users.length,
      [GroupsTableAccessor.PERMISSIONS]: permissionsContent,
      [GroupsTableAccessor.CREATION_TIME]: createdAt,
    });
  });

  return rows;
};

export { getRows };
