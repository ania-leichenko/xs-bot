import { UsersTableAccessor } from 'common/enums/enums';
import { EAMWorkerGetAllItemResponseDto } from 'common/types/types';

type Row = {
  [UsersTableAccessor.USERNAME]: string;
  [UsersTableAccessor.GROUPS]: string;
  [UsersTableAccessor.CREATION_TIME]: string;
};

const getRows = (workers: EAMWorkerGetAllItemResponseDto[]): Row[] => {
  return workers.map((item: EAMWorkerGetAllItemResponseDto) => {
    const { id, name, groups, createdAt } = item;

    const groupsName = groups.map((item) => item.name).join(', ');

    const reDate = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
    const el = reDate.exec(createdAt);
    const date = `${el![1]}/${el![2]}/${el![3]} ${el![4]}:${el![5]}`;

    return {
      [UsersTableAccessor.ID]: id,
      [UsersTableAccessor.USERNAME]: name,
      [UsersTableAccessor.GROUPS]: groupsName,
      [UsersTableAccessor.CREATION_TIME]: date,
    };
  });
};

export { getRows };
