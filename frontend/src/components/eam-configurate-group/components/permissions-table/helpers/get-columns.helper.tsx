import {
  PermissionsTableAccessor,
  PermissionsTableHeader,
} from 'common/enums/enums';
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
      Header: PermissionsTableHeader.PERMISSIONS_NAME,
      accessor: PermissionsTableAccessor.PERMISSION_NAME,
      minWidth: 140,
      width: 300,
      sortType: 'basic',
    },
    {
      Header: PermissionsTableHeader.CREATION_TIME,
      accessor: PermissionsTableAccessor.CREATION_TIME,
      minWidth: 120,
      width: 300,
      sortType: 'basic',
    },
  ];
};

export { getColumns };
