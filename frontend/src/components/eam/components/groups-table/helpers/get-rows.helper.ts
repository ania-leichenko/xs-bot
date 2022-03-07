import { GroupsTableAccessor } from 'common/enums/enums';
import { EAMGroupGetByTenantResponseItemDto } from 'common/types/types';
import { getDistanceToDateNow } from 'helpers/helpers';
import { ActionCell } from '../components/action-cell/action-cell';

type Row = {
  [GroupsTableAccessor.GROUP_NAME]: string;
  [GroupsTableAccessor.WORKERS]: number;
  [GroupsTableAccessor.PERMISSIONS]: string;
  [GroupsTableAccessor.CREATION_TIME]: string;
};

const getRows = ({
  groups,
  onGroupDelete,
}: {
  groups: EAMGroupGetByTenantResponseItemDto[];
  onGroupDelete: (id: string) => void;
}): Row[] => {
  return groups.map((item) => {
    const { id, name, users, permissions, createdAt } = item;
    const permissionsContent = permissions.map((item) => item.name).join(', ');

    return {
      [GroupsTableAccessor.GROUP_NAME]: name,
      [GroupsTableAccessor.WORKERS]: users.length,
      [GroupsTableAccessor.PERMISSIONS]: permissionsContent,
      [GroupsTableAccessor.CREATION_TIME]: getDistanceToDateNow(
        new Date(createdAt),
      ),
      [GroupsTableAccessor.ACTIONS]: ActionCell(id, onGroupDelete),
    };
  });
};

export { getRows };
