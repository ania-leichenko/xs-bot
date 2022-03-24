import { Column } from 'react-table';
import { ObjectsTableHeader, ObjectsTableAccessor } from 'common/enums/enums';

const getColumns = (): Column[] => {
  return [
    {
      Header: ObjectsTableHeader.OBJECT_NAME,
      accessor: ObjectsTableAccessor.OBJECT_NAME,
      minWidth: 100,
      width: 650,
    },
    {
      Header: ObjectsTableHeader.CREATED_AT,
      accessor: ObjectsTableAccessor.CREATED_AT,
      minWidth: 120,
      width: 300,
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
