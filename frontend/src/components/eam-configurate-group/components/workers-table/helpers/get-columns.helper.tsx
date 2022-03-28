import { UsersTableHeader, UsersTableAccessor } from 'common/enums/enums';
import { Column, Row } from 'react-table';
import { sortCallback, getDateDecoratedWithAgo } from 'helpers/helpers';

const getColumns = (): Column[] => {
  return [
    {
      Header: '',
      accessor: UsersTableAccessor.ACTION,
      minWidth: 55,
      width: 55,
      sortType: 'basic',
    },
    {
      Header: UsersTableHeader.USERNAME,
      accessor: UsersTableAccessor.USERNAME,
      minWidth: 150,
      width: 200,
      sortType: 'basic',
    },
    {
      Header: UsersTableHeader.GROUPS,
      accessor: UsersTableAccessor.GROUPS,
      minWidth: 100,
      width: 250,
      sortType: 'basic',
    },
    {
      Header: UsersTableHeader.CREATED_AT,
      accessor: UsersTableAccessor.CREATED_AT,
      minWidth: 120,
      width: 200,
      sortType: (rowA: Row, rowB: Row, id: string): number => {
        return sortCallback(rowA.values[id], rowB.values[id]);
      },
      Cell: ({ value }): string => {
        return getDateDecoratedWithAgo(new Date(value));
      },
    },
  ];
};

export { getColumns };
