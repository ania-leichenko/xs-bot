import { UsersTableHeader, UsersTableAccessor } from 'common/enums/enums';
import { Column } from 'react-table';
import { SelectRowCell } from '../../../helpers/helpers';

const getColumns = (
  handleAddId: (id: string) => void,
  handleRemoveId: (id: string) => void,
  handleIsCheckedId: (id: string) => boolean,
): Column[] => {
  return [
    {
      Header: '',
      accessor: 'check',
      Cell: ({ row }): JSX.Element =>
        SelectRowCell(row, handleAddId, handleRemoveId, handleIsCheckedId),
      minWidth: 30,
      width: 50,
      sortType: 'basic',
    },
    {
      Header: UsersTableHeader.USERNAME,
      accessor: UsersTableAccessor.USERNAME,
      minWidth: 150,
      width: 200,
      sortType: 'basic',
    },
    {
      Header: UsersTableHeader.GROUPS,
      accessor: UsersTableAccessor.GROUPS,
      minWidth: 100,
      width: 250,
      sortType: 'basic',
    },
    {
      Header: UsersTableHeader.CREATION_TIME,
      accessor: UsersTableAccessor.CREATION_TIME,
      minWidth: 120,
      width: 200,
      sortType: 'basic',
    },
  ];
};

export { getColumns };
