import { Column } from 'react-table';
import {
  FunctionsTableHeader,
  FunctionsTableAccessor,
} from 'common/enums/enums';

const getColumns = (): Column[] => {
  return [
    {
      Header: FunctionsTableHeader.FUNCTION_NAME,
      accessor: FunctionsTableAccessor.FUNCTION_NAME,
      minWidth: 200,
      width: 400,
      sortType: 'basic',
    },
    {
      Header: FunctionsTableHeader.CREATION_TIME,
      accessor: FunctionsTableAccessor.CREATION_TIME,
      minWidth: 150,
      width: 300,
      sortType: 'basic',
    },
    {
      Header: FunctionsTableHeader.UPDATION_TIME,
      accessor: FunctionsTableAccessor.UPDATION_TIME,
      minWidth: 150,
      width: 300,
      sortType: 'basic',
    },
    {
      Header: FunctionsTableHeader.ACTIONS,
      accessor: FunctionsTableAccessor.ACTIONS,
      minWidth: 100,
      width: 100,
      disableSortBy: true,
    },
  ];
};

export { getColumns };
