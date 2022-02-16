import { UsersTableAccessor } from 'common/enums/enums';
import { EAMWorkerGetAllItemResponseDto } from 'common/types/types';

type Row = {
  [UsersTableAccessor.USERNAME]: string;
};

const getRows = (workers: EAMWorkerGetAllItemResponseDto[]): Row[] => {
  return workers.map((item: EAMWorkerGetAllItemResponseDto) => {
    const { id, name } = item;

    return {
      [UsersTableAccessor.ID]: id,
      [UsersTableAccessor.USERNAME]: name,
    };
  });
};

export { getRows };
