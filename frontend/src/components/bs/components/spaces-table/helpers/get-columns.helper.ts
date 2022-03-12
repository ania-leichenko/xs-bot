import { SpacesTableHeader, SpacesTableAccessor } from 'common/enums/enums';
import { Column } from 'react-table';

const getColumns = (): Column[] => {
  return [
    {
      Header: SpacesTableHeader.SPACE_NAME,
      accessor: SpacesTableAccessor.SPACE_NAME,
    },
    {
      Header: SpacesTableHeader.CREATED_AT,
      accessor: SpacesTableAccessor.CREATED_AT,
    },
    {
      Header: SpacesTableHeader.ACTIONS,
      accessor: SpacesTableAccessor.ACTIONS,
    },
  ];
};

export { getColumns };
