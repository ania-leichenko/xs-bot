import { Column } from 'react-table';
import { WorkersTableHeader, WorkersTableAccessor } from 'common/enums/enums';

const getColumns = (): Column[] => {
  return [
    {
      Header: WorkersTableHeader.WORKER_NAME,
      accessor: WorkersTableAccessor.WORKER_NAME,
      minWidth: 100,
      width: 400,
      sortType: 'basic',
    },
    {
      Header: WorkersTableHeader.GROUPS,
      accessor: WorkersTableAccessor.GROUPS,
      minWidth: 100,
      width: 400,
      sortType: 'basic',
    },
    {
      Header: WorkersTableHeader.CREATION_TIME,
      accessor: WorkersTableAccessor.CREATION_TIME,
      minWidth: 120,
      width: 200,
      sortType: 'basic',
    },
    {
      Header: WorkersTableHeader.ACTIONS,
      accessor: WorkersTableAccessor.ACTIONS,
      minWidth: 100,
      width: 100,
      disableSortBy: true,
    },
  ];
};

export { getColumns };
