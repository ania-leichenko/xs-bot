import { Column } from 'react-table';
import { SpacesTableHeader, SpacesTableAccessor } from 'common/enums/enums';

const getColumns = (): Column[] => {
  return [
    {
      Header: SpacesTableHeader.SPACE_NAME,
      accessor: SpacesTableAccessor.SPACE_NAME,
      minWidth: 100,
      width: 650,
    },
    {
      Header: SpacesTableHeader.CREATED_AT,
      accessor: SpacesTableAccessor.CREATED_AT,
      minWidth: 120,
      width: 300,
    },
    {
      Header: SpacesTableHeader.ACTIONS,
      accessor: SpacesTableAccessor.ACTIONS,
      minWidth: 100,
      width: 150,
    },
  ];
};

export { getColumns };
