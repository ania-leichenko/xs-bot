import { UsersTableAccessor } from 'common/enums/enums';
import { EAMWorkerGetAllItemResponseDto } from 'common/types/types';

type Row = {
  [UsersTableAccessor.USERNAME]: string;
  [UsersTableAccessor.TENANT_ID]: string;
};

const getRows = (workers: EAMWorkerGetAllItemResponseDto[]): Row[] => {
  return workers.map((item: EAMWorkerGetAllItemResponseDto) => {
    const { id, name, tenantId } = item;

    return {
      [UsersTableAccessor.ID]: id,
      [UsersTableAccessor.USERNAME]: name,
      [UsersTableAccessor.TENANT_ID]: tenantId,
    };
  });
};

export { getRows };
