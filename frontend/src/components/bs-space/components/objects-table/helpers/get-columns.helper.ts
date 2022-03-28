import { Column, Row } from 'react-table';
import { ObjectsTableHeader, ObjectsTableAccessor } from 'common/enums/enums';
import { sortCallback, getDateDecoratedWithAgo } from 'helpers/helpers';

const getColumns = (): Column[] => {
  return [
    {
      Header: ObjectsTableHeader.OBJECT_NAME,
      accessor: ObjectsTableAccessor.OBJECT_NAME,
      minWidth: 100,
      width: 450,
    },
    {
      Header: ObjectsTableHeader.CREATED_AT,
      accessor: ObjectsTableAccessor.CREATED_AT,
      minWidth: 120,
      width: 300,
      sortType: (rowA: Row, rowB: Row, id: string): number => {
        return sortCallback(rowA.values[id], rowB.values[id]);
      },
      Cell: ({ value }): string => {
        return getDateDecoratedWithAgo(new Date(value));
      },
    },
    {
      Header: ObjectsTableHeader.SIZE,
      accessor: ObjectsTableAccessor.SIZE,
      minWidth: 120,
      width: 300,
    },
    {
      Header: ObjectsTableHeader.ACTIONS,
      accessor: ObjectsTableAccessor.ACTIONS,
      minWidth: 100,
      width: 150,
    },
  ];
};

export { getColumns };
