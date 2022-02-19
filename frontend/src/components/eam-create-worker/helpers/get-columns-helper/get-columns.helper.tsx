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
    },
    {
      Header: GroupsTableHeader.GROUP_NAME,
      accessor: GroupsTableAccessor.GROUP_NAME,
    },
  ];
};

export { getColumns };
