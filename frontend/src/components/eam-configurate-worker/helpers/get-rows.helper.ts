import { GroupsTableAccessor } from 'common/enums/enums';
import { EAMGroupGetByTenantResponseItemDto } from 'common/types/types';
import { getDateDecoratedWithAgo } from 'helpers/helpers';
import { PermissionsCell } from '../helpers/get-columns-helper/cells/cells';

type Row = {
  [GroupsTableAccessor.ID]: string;
  [GroupsTableAccessor.GROUP_NAME]: string;
  [GroupsTableAccessor.WORKERS]: number;
  [GroupsTableAccessor.PERMISSIONS]: JSX.Element;
  [GroupsTableAccessor.CREATION_TIME]: string;
};

const getRows = (groups: EAMGroupGetByTenantResponseItemDto[]): Row[] => {
  return groups.map((item: EAMGroupGetByTenantResponseItemDto) => {
    const { id, name, users, permissions, createdAt } = item;

    const groupPermissions = permissions.map((item) => item.name);

    return {
      [GroupsTableAccessor.ID]: id,
      [GroupsTableAccessor.GROUP_NAME]: name,
      [GroupsTableAccessor.WORKERS]: users.length,
      [GroupsTableAccessor.PERMISSIONS]: PermissionsCell(groupPermissions),
      [GroupsTableAccessor.CREATION_TIME]: getDateDecoratedWithAgo(
        new Date(createdAt),
      ),
    };
  });
};

export { getRows };
