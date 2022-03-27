import { UsersTableAccessor } from 'common/enums/enums';
import { EAMWorkerGetAllItemResponseDto } from 'common/types/types';
import { SelectRowCell } from '../../components';
import { getDateDecoratedWithAgo } from 'helpers/helpers';

type Row = {
  [UsersTableAccessor.USERNAME]: string;
  [UsersTableAccessor.GROUPS]: string;
  [UsersTableAccessor.CREATION_TIME]: string;
};

const getRows = (
  workers: EAMWorkerGetAllItemResponseDto[],
  handleAddId: (id: string) => void,
  handleRemoveId: (id: string) => void,
  handleIsCheckedId: (id: string) => boolean,
): Row[] => {
  return workers.map((item: EAMWorkerGetAllItemResponseDto) => {
    const { id, name, groups, createdAt } = item;

    const groupsName = groups.map((item) => item.name).join(', ');

    return {
      [UsersTableAccessor.ID]: id,
      [UsersTableAccessor.USERNAME]: name,
      [UsersTableAccessor.GROUPS]: groupsName,
      [UsersTableAccessor.CREATION_TIME]: getDateDecoratedWithAgo(
        new Date(createdAt),
      ),
      [UsersTableAccessor.ACTION]: SelectRowCell(
        id,
        handleAddId,
        handleRemoveId,
        handleIsCheckedId,
      ),
    };
  });
};

export { getRows };
