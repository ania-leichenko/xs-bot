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
import { sc as scActions } from 'store/actions';

type Props = {
  onInstanceDelete: (id: string) => void;
  onKeyClick: (id: string) => void;
  pagination?: {
    perPage: number;
    countItems: number;
    handleLoad: (from: number) => void;
    from: number;
  };
};

const InstancesTable: FC<Props> = ({
  children,
  onInstanceDelete,
  onKeyClick,
}) => {
  const dispatch = useAppDispatch();
  const { instances, dataStatus, countItems } = useAppSelector(({ sc }) => ({
    instances: sc.instances,
    dataStatus: sc.dataStatus,
    countItems: sc.countItems,
  }));
  const isLoading = dataStatus === DataStatus.PENDING;

  const handleLoad = (from: number, count: number): void => {
    dispatch(
      scActions.loadInstances({
        from: from,
        count: count,
      }),
    );
  };

  const spacePagination = usePagination({
    perPageCount: Pagination.PER_PAGE,
    countItems,
    onLoad: handleLoad,
    from: Pagination.INITIAL_FROM_COUNT,
  });

  const data = useMemo(
    () => getRows({ instances, onInstanceDelete, onKeyClick }),
    [instances, onInstanceDelete],
  );

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Instances"
      placeholder="No instances to display"
      pagination={spacePagination}
      isLoading={isLoading}
    >
      {children}
    </Table>
  );
};

export { InstancesTable };
