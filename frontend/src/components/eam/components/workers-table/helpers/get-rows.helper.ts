import { WorkersTableAccessor } from 'common/enums/enums';
import { EAMWorkerGetAllResponseDto } from 'common/types/types';

type Row = {
  [WorkersTableAccessor.USER_NAME]: string;
  [WorkersTableAccessor.GROUPS]: string[];
  [WorkersTableAccessor.CREATION_TIME]: string;
};

const getRows = (workers: EAMWorkerGetAllResponseDto): Row[] => {
  return workers.items.map((item) => {
    const { name, groupIds, createdAt } = item;

    return {
      [WorkersTableAccessor.USER_NAME]: name,
      [WorkersTableAccessor.GROUPS]: groupIds,
      [WorkersTableAccessor.CREATION_TIME]: createdAt,
    };
  });
};

export { getRows };
