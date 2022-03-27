import { GroupsTableHeader, GroupsTableAccessor } from 'common/enums/enums';
import { Column } from 'react-table';
import { SelectRowCell } from './cells/cells';

const getColumns = (
  handleAddGroupId: (id: string) => void,
  handleRemoveGroupId: (id: string) => void,
  handleIsCheckedId: (id: string) => boolean,
): Column[] => {
  return [
    {
      Header: '',
      accessor: 'check',
      Cell: ({ row }): JSX.Element =>
        SelectRowCell(
          row,
          handleAddGroupId,
          handleRemoveGroupId,
          handleIsCheckedId,
        ),
      minWidth: 30,
      width: 50,
      sortType: 'basic',
    },
    {
      Header: GroupsTableHeader.GROUP_NAME,
      accessor: GroupsTableAccessor.GROUP_NAME,
      minWidth: 150,
      width: 200,
      sortType: 'basic',
    },
    {
      Header: GroupsTableHeader.WORKERS,
      accessor: GroupsTableAccessor.WORKERS,
      minWidth: 100,
      width: 100,
      sortType: 'basic',
    },
    {
      Header: GroupsTableHeader.PERMISSIONS,
      accessor: GroupsTableAccessor.PERMISSIONS,
      minWidth: 150,
      width: 200,
      sortType: 'basic',
    },
    {
      Header: GroupsTableHeader.CREATION_TIME,
      accessor: GroupsTableAccessor.CREATION_TIME,
      minWidth: 150,
      width: 150,
      sortType: 'basic',
    },
  ];
};

export { getColumns };
