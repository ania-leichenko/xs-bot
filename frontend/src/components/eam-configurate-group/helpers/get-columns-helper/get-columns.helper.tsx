import { UsersTableHeader, UsersTableAccessor } from 'common/enums/enums';
import { Column } from 'react-table';
import { SelectRowCell } from './cells/cells';

const getColumns = (selected_workers: Set<string>): Column[] => {
  return [
    {
      Header: '',
      accessor: 'check',
      Cell: ({ row }): JSX.Element => SelectRowCell(row, selected_workers),
    },
    {
      Header: UsersTableHeader.USERNAME,
      accessor: UsersTableAccessor.USERNAME,
    },
    {
      Header: UsersTableHeader.TENANT_ID,
      accessor: UsersTableAccessor.TENANT_ID,
    },
  ];
};

export { getColumns };
