import { GroupsTableAccessor } from 'common/enums/enums';
import { EAMGroupGetByTenantResponseItemDto } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/helpers';

type Row = {
  [GroupsTableAccessor.ID]: string;
  [GroupsTableAccessor.GROUP_NAME]: string;
  [GroupsTableAccessor.WORKERS]: string;
  [GroupsTableAccessor.PERMISSIONS]: string;
  [GroupsTableAccessor.CREATION_TIME]: string;
};

const getRows = (groups: EAMGroupGetByTenantResponseItemDto[]): Row[] => {
  return groups.map((item: EAMGroupGetByTenantResponseItemDto) => {
    const { id, name, users, permissions, createdAt } = item;

    const usersNames = users.map((item) => item.name).join(', ');
    const permissionsNames = permissions.map((item) => item.name).join(', ');

    return {
      [GroupsTableAccessor.ID]: id,
      [GroupsTableAccessor.GROUP_NAME]: name,
      [GroupsTableAccessor.WORKERS]: usersNames,
      [GroupsTableAccessor.PERMISSIONS]: permissionsNames,
      [GroupsTableAccessor.CREATION_TIME]: getDistanceToDateNow(
        new Date(createdAt),
      ),
    };
  });
};

export { getRows };
