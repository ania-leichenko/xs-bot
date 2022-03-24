import { FC } from 'react';
import { useAppSelector, useMemo, useAppDispatch } from 'hooks/hooks';
import { Table } from 'components/common/table/table';
import { getRows, getColumns } from './helpers/helpers';
import { PaginationEnum } from 'common/enums/enums';
import { eam as eamActions } from 'store/actions';

const WorkersTable: FC<{
  pagination?: {
    perPage: number;
    countItems: number;
    handleLoad: (from: number) => void;
  };
}> = ({ children }) => {
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
        count: 5,
      }),
    );
  };

  const workersPagination = {
    perPage: PaginationEnum.PER_PAGE,
    countItems,
    handleLoad,
  };

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
