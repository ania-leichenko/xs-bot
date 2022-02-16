import { WorkersTableHeader, WorkersTableAccessor } from 'common/enums/enums';

type Column = {
  Header: string;
  accessor: string;
};

const getColumns = (): Column[] => {
  return [
    {
      Header: WorkersTableHeader.USER_NAME,
      accessor: WorkersTableAccessor.USER_NAME,
    },
    {
      Header: WorkersTableHeader.GROUPS,
      accessor: WorkersTableAccessor.GROUPS,
    },
    {
      Header: WorkersTableHeader.CREATION_TIME,
      accessor: WorkersTableAccessor.CREATION_TIME,
    },
    {
      Header: WorkersTableHeader.ACTIONS,
      accessor: WorkersTableAccessor.ACTIONS,
    },
  ];
};

export { getColumns };
