import { FC } from 'react';
import {
  useAppSelector,
  useMemo,
  useAppDispatch,
  usePagination,
} from 'hooks/hooks';
import { Table } from 'components/common/table/table';
import { getRows, getColumns } from './helpers/helpers';
import { Pagination } from 'common/enums/enums';
import { eam as eamActions } from 'store/actions';

type Props = {
  pagination?: {
    perPage: number;
    countItems: number;
    handleLoad: (from: number) => void;
  };
};

const WorkersTable: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const {
    workers,
    countItems: countItems,
    tenantId,
  } = useAppSelector(({ app, eam }) => ({
    workers: eam.workers,
    countItems: eam.countItems,
    tenantId: app.tenant?.id,
  }));

  const handleLoad = (from: number): void => {
    dispatch(
      eamActions.loadWorkers({
        tenantId: tenantId as string,
        from: from,
        count: Pagination.PER_PAGE,
      }),
    );
  };

  const workersPagination = usePagination({
    perPage: Pagination.PER_PAGE,
    countItems,
    onLoad: handleLoad,
  });

  const data = useMemo(() => getRows(workers), [workers]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Workers"
      placeholder="No workers to display"
      pagination={workersPagination}
    >
      {children}
    </Table>
  );
};

export { WorkersTable };
