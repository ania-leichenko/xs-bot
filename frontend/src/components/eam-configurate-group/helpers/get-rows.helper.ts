import { UsersTableAccessor } from 'common/enums/enums';
import {
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetAllItemResponseDto,
} from 'common/types/types';

type Row = {
  [UsersTableAccessor.USERNAME]: string;
  [UsersTableAccessor.TENANT_ID]: string;
};

const getRows = ({ items }: EAMWorkerGetAllResponseDto): Row[] => {
  return items.map((item: EAMWorkerGetAllItemResponseDto) => {
    const { id, name, tenantId } = item;

    return {
      [UsersTableAccessor.ID]: id,
      [UsersTableAccessor.USERNAME]: name,
      [UsersTableAccessor.TENANT_ID]: tenantId,
    };
  });
};

export { getRows };
