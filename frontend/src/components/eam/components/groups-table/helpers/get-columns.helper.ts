import { Column, Row } from 'react-table';
import { GroupsTableHeader, GroupsTableAccessor } from 'common/enums/enums';
import { sortCallback, getDateDecoratedWithAgo } from 'helpers/helpers';

const getColumns = (): Column[] => {
  return [
    {
      Header: GroupsTableHeader.GROUP_NAME,
      accessor: GroupsTableAccessor.GROUP_NAME,
      minWidth: 140,
      width: 200,
      sortType: 'basic',
    },
    {
      Header: GroupsTableHeader.WORKERS,
      accessor: GroupsTableAccessor.WORKERS,
      minWidth: 100,
      width: 120,
      sortType: 'number',
    },
    {
      Header: GroupsTableHeader.PERMISSIONS,
      accessor: GroupsTableAccessor.PERMISSIONS,
      minWidth: 140,
      width: 450,
      sortType: 'basic',
    },
    {
      Header: GroupsTableHeader.CREATED_AT,
      accessor: GroupsTableAccessor.CREATED_AT,
      minWidth: 120,
      width: 200,
      sortType: (rowA: Row, rowB: Row, id: string): number => {
        return sortCallback(rowA.values[id], rowB.values[id]);
      },
      Cell: ({ value }): string => {
        return getDateDecoratedWithAgo(new Date(value));
      },
    },
    {
      Header: GroupsTableHeader.ACTIONS,
      accessor: GroupsTableAccessor.ACTIONS,
      minWidth: 100,
      width: 150,
      disableSortBy: true,
    },
  ];
};

export { getColumns };
