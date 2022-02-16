import { UsersTableHeader, UsersTableAccessor } from 'common/enums/enums';
import { Column } from 'react-table';
import { SelectRowCell } from './cells/cells';

const getColumns = (
  addWorkerId: (id: string) => void,
  removeWorkersId: (id: string) => void,
): Column[] => {
  return [
    {
      Header: '',
      accessor: 'check',
      Cell: ({ row }): JSX.Element =>
        SelectRowCell(row, addWorkerId, removeWorkersId),
    },
    {
      Header: UsersTableHeader.USERNAME,
      accessor: UsersTableAccessor.USERNAME,
    },
  ];
};

export { getColumns };
