import { FC } from 'react';
import {
  useAppSelector,
  useMemo,
  useAppDispatch,
  usePagination,
} from 'hooks/hooks';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';
import { DataStatus } from 'common/enums/enums';
import { Pagination } from 'common/enums/enums';
import { slc as slcActions } from 'store/actions';

type Props = {
  onFunctionDelete: (id: string) => void;
  pagination?: {
    perPage: number;
    countItems: number;
    handleLoad: (from: number) => void;
    from: number;
  };
};

const FunctionsTable: FC<Props> = ({ children, onFunctionDelete }) => {
  const { functions, dataStatus, countItems } = useAppSelector(({ slc }) => ({
    functions: slc.functions,
    dataStatus: slc.dataStatus,
    countItems: slc.countItems,
  }));

  const isLoading = dataStatus === DataStatus.PENDING;
  const dispatch = useAppDispatch();
  const handleLoad = (from: number, count: number): void => {
    dispatch(
      slcActions.loadFunctions({
        from: from,
        count: count,
      }),
    );
  };

  const functionPagination = usePagination({
    perPageCount: Pagination.PER_PAGE,
    countItems,
    onLoad: handleLoad,
    from: Pagination.INITIAL_FROM_COUNT,
  });

  const data = useMemo(
    () => getRows({ slcFunctions: functions, onFunctionDelete }),
    [functions],
  );

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Functions"
      placeholder="No functions to display"
      pagination={functionPagination}
      isLoading={isLoading}
    >
      {children}
    </Table>
  );
};

export { FunctionsTable };
