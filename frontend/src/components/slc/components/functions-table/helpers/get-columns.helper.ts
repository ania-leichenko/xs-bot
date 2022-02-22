import {
  FunctionsTableHeader,
  FunctionsTableAccessor,
} from 'common/enums/enums';

type Column = {
  Header: string;
  accessor: string;
};

const getColumns = (): Column[] => {
  return [
    {
      Header: FunctionsTableHeader.FUNCTION_NAME,
      accessor: FunctionsTableAccessor.FUNCTION_NAME,
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
