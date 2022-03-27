import { GroupsTableHeader, GroupsTableAccessor } from 'common/enums/enums';
import { Column, Row } from 'react-table';
import { SelectRowCell } from './cells/cells';
import { sortCallback, getDateDecoratedWithAgo } from 'helpers/helpers';

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
      Header: GroupsTableHeader.CREATED_AT,
      accessor: GroupsTableAccessor.CREATED_AT,
      minWidth: 150,
      width: 150,
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
