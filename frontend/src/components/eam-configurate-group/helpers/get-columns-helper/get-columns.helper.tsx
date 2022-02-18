import { UsersTableHeader, UsersTableAccessor } from 'common/enums/enums';
import { Column } from 'react-table';
import { SelectRowCell } from './cells/cells';

const getColumns = (
  handleAddWorkerId: (id: string) => void,
  handleRemoveWorkerId: (id: string) => void,
  handleIsCheckedId: (id: string) => boolean,
): Column[] => {
  return [
    {
      Header: '',
      accessor: 'check',
      Cell: ({ row }): JSX.Element =>
        SelectRowCell(
          row,
          handleAddWorkerId,
          handleRemoveWorkerId,
          handleIsCheckedId,
        ),
    },
    {
      Header: UsersTableHeader.USERNAME,
      accessor: UsersTableAccessor.USERNAME,
    },
    {
      Header: UsersTableHeader.GROUPS,
      accessor: UsersTableAccessor.GROUPS,
    },
    {
      Header: UsersTableHeader.CREATION_TIME,
      accessor: UsersTableAccessor.CREATION_TIME,
    },
  ];
};

export { getColumns };
