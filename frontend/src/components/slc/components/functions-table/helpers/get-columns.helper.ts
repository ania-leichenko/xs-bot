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
    },
    {
      Header: FunctionsTableHeader.CREATION_TIME,
      accessor: FunctionsTableAccessor.CREATION_TIME,
    },
    {
      Header: FunctionsTableHeader.UPDATION_TIME,
      accessor: FunctionsTableAccessor.UPDATION_TIME,
    },
    {
      Header: FunctionsTableHeader.ACTIONS,
      accessor: FunctionsTableAccessor.ACTIONS,
    },
  ];
};

export { getColumns };
