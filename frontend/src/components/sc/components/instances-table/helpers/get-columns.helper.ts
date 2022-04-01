import { Column, Row } from 'react-table';
import {
  InstancesTableHeader,
  InstancesTableAccessor,
} from 'common/enums/enums';
import { sortCallback, getDateDecoratedWithAgo } from 'helpers/helpers';

const getColumns = (): Column[] => {
  return [
    {
      Header: InstancesTableHeader.NAME,
      accessor: InstancesTableAccessor.NAME,
      minWidth: 200,
      width: 230,
      sortType: 'basic',
    },
    {
      Header: InstancesTableHeader.INSTANCE_ID,
      accessor: InstancesTableAccessor.INSTANCE_ID,
      minWidth: 150,
      width: 200,
      sortType: 'basic',
    },
    {
      Header: InstancesTableHeader.INSTANCE_STATE,
      accessor: InstancesTableAccessor.INSTANCE_STATE,
      minWidth: 100,
      width: 150,
      sortType: 'basic',
    },
    {
      Header: InstancesTableHeader.OS,
      accessor: InstancesTableAccessor.OS,
      minWidth: 100,
      width: 200,
      sortType: 'basic',
    },
    {
      Header: InstancesTableHeader.INSTANCE_TYPE,
      accessor: InstancesTableAccessor.INSTANCE_TYPE,
      minWidth: 100,
      width: 150,
      sortType: 'basic',
    },
    {
      Header: InstancesTableHeader.PUBLIC_IPV4_ADDRESS,
      accessor: InstancesTableAccessor.PUBLIC_IPV4_ADDRESS,
      minWidth: 150,
      width: 200,
      sortType: 'basic',
    },
    {
      Header: InstancesTableHeader.CREATED_AT,
      accessor: InstancesTableHeader.CREATED_AT,
      minWidth: 130,
      width: 150,
      sortType: (rowA: Row, rowB: Row, id: string): number => {
        return sortCallback(rowA.values[id], rowB.values[id]);
      },
      Cell: ({ value }): string => {
        return getDateDecoratedWithAgo(new Date(value));
      },
    },
    {
      Header: InstancesTableHeader.ACTIONS,
      accessor: InstancesTableAccessor.ACTIONS,
      minWidth: 150,
      width: 150,
      disableSortBy: true,
    },
  ];
};

export { getColumns };
