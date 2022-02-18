import { GroupsTableAccessor } from 'common/enums/enums';
import { EAMGroupGetByTenantResponseItemDto } from 'common/types/types';

type Row = {
  [GroupsTableAccessor.GROUP_NAME]: string;
};

const getRows = (groups: EAMGroupGetByTenantResponseItemDto[]): Row[] => {
  return groups.map((item: EAMGroupGetByTenantResponseItemDto) => {
    const { name, id } = item;

    return {
      [GroupsTableAccessor.GROUP_NAME]: name,
      id,
    };
  });
};

export { getRows };
