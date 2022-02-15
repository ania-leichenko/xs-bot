import { UsersTableAccessor } from 'common/enums/enums';

type Row = {
  [UsersTableAccessor.USERNAME]: string;
  [UsersTableAccessor.TENANT_ID]: string;
};

const getRows = (workers: []): Row[] => {
  return workers?.map((item) => {
    const { id, name, tenantId } = item;

    return {
      [UsersTableAccessor.ID]: id,
      [UsersTableAccessor.USERNAME]: name,
      [UsersTableAccessor.TENANT_ID]: tenantId,
    };
  });
};

export { getRows };
