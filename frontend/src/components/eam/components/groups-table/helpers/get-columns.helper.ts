import { GroupsTableHeader, GroupsTableAccessor } from 'common/enums/enums';

type Column = {
  Header: string;
  accessor: string;
};

const getColumns = (): Column[] => {
  return [
    {
      Header: GroupsTableHeader.GROUP_NAME,
      accessor: GroupsTableAccessor.GROUP_NAME,
    },
    {
      Header: GroupsTableHeader.WORKERS,
      accessor: GroupsTableAccessor.WORKERS,
    },
    {
      Header: GroupsTableHeader.PERMISSIONS,
      accessor: GroupsTableAccessor.PERMISSIONS,
    },
    {
      Header: GroupsTableHeader.CREATION_TIME,
      accessor: GroupsTableAccessor.CREATION_TIME,
    },
    {
      Header: GroupsTableHeader.ACTIONS,
      accessor: GroupsTableAccessor.ACTIONS,
    },
  ];
};

export { getColumns };
