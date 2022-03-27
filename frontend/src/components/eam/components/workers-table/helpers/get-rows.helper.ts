import { WorkersTableAccessor } from 'common/enums/enums';
import { EAMWorkerGetAllItemResponseDto } from 'common/types/types';

type Row = {
  [WorkersTableAccessor.WORKER_NAME]: string;
  [WorkersTableAccessor.GROUPS]: string;
  [WorkersTableAccessor.CREATED_AT]: string;
};

const getRows = (workers: EAMWorkerGetAllItemResponseDto[]): Row[] => {
  return workers.map((item) => {
    const { name, groups, createdAt } = item;

    const groupsName = groups.map((item) => item.name).join(', ');

    return {
      [WorkersTableAccessor.WORKER_NAME]: name,
      [WorkersTableAccessor.GROUPS]: groupsName,
      [WorkersTableAccessor.CREATED_AT]: createdAt,
    };
  });
};

export { getRows };
