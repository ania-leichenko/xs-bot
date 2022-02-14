// import { WorkersTableAccessor } from 'common/enums/enums';
import { EAMWorkerGetAllResponseDto } from 'common/types/types';

// type Row = {
//   [WorkersTableAccessor.USER_NAME]: string;
//   [WorkersTableAccessor.GROUPS]: number;
//   [WorkersTableAccessor.CREATION_TIME]: string;
// };

const getRows = (
  workers: EAMWorkerGetAllResponseDto | null,
): EAMWorkerGetAllResponseDto | null => {
  return workers;
  // return groups.map((item) => {
  // const { name, groups, createdAt } = item;

  //   return {
  //     [WorkersTableAccessor.USER_NAME]: name,
  //     [WorkersTableAccessor.GROUPS]: groups,
  //     [WorkersTableAccessor.CREATION_TIME]: createdAt,
  //   };
  // });
};

export { getRows };
