import {
  PermissionsTableAccessor,
  PermissionsTableHeader,
} from 'common/enums/enums';
import { Column, Row } from 'react-table';
import { sortCallback, getDateDecoratedWithAgo } from 'helpers/helpers';

const getColumns = (): Column[] => {
  return [
    {
      Header: '',
      accessor: PermissionsTableAccessor.ACTION,
      minWidth: 30,
      width: 50,
      sortType: 'basic',
    },
    {
      Header: PermissionsTableHeader.PERMISSIONS_NAME,
      accessor: PermissionsTableAccessor.PERMISSION_NAME,
      minWidth: 140,
      width: 300,
      sortType: 'basic',
    },
    {
      Header: PermissionsTableHeader.CREATION_TIME,
      accessor: PermissionsTableAccessor.CREATED_AT,
      minWidth: 120,
      width: 300,
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
