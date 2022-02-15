import { UsersTableAccessor } from 'common/enums/enums';
import { EAMWorkerCreateResponseDto } from 'common/types/types';

type Row = {
  [UsersTableAccessor.USERNAME]: string;
  [UsersTableAccessor.TENANT_ID]: string;
};

const getRows = (workers: EAMWorkerCreateResponseDto[]): Row[] => {
  return workers.map((item) => {
    const { name, tenantId, id } = item;

    return {
      [UsersTableAccessor.ID]: id,
      [UsersTableAccessor.USERNAME]: name,
      [UsersTableAccessor.TENANT_ID]: tenantId,
    };
  });
};

export { getRows };
