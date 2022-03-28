import { UsersTableAccessor } from 'common/enums/enums';
import { EAMWorkerGetAllItemResponseDto } from 'common/types/types';
import { SelectRowCell } from '../../components';

type Row = {
  [UsersTableAccessor.USERNAME]: string;
  [UsersTableAccessor.GROUPS]: string;
  [UsersTableAccessor.CREATED_AT]: string;
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
      [UsersTableAccessor.CREATED_AT]: createdAt,
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
