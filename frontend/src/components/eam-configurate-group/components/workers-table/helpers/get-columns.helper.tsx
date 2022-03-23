import { UsersTableHeader, UsersTableAccessor } from 'common/enums/enums';
import { Column } from 'react-table';

const getColumns = (): Column[] => {
  return [
    {
      Header: UsersTableHeader.ACTION,
      accessor: UsersTableAccessor.ACTION,
      minWidth: 30,
      width: 50,
    },
    {
      Header: UsersTableHeader.USERNAME,
      accessor: UsersTableAccessor.USERNAME,
      minWidth: 150,
      width: 200,
    },
    {
      Header: UsersTableHeader.GROUPS,
      accessor: UsersTableAccessor.GROUPS,
      minWidth: 100,
      width: 250,
    },
    {
      Header: UsersTableHeader.CREATION_TIME,
      accessor: UsersTableAccessor.CREATION_TIME,
      minWidth: 120,
      width: 200,
    },
  ];
};

export { getColumns };
