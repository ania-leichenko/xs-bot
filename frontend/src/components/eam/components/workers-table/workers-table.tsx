import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/table/table';
import { getRows, getColumns } from './helpers/helpers';
import { DataStatus } from '../../../../common/enums/app/data-status.enum';

const WorkersTable: FC = ({ children }) => {
  const { workers, workersDataStatus } = useAppSelector(({ eam }) => ({
    workers: eam.workers,
    workersDataStatus: eam.workersDataStatus,
  }));

  const isLoading = workersDataStatus === DataStatus.PENDING;

  const data = useMemo(() => getRows(workers), [workers]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Workers"
      placeholder="No workers to display"
      isLoading={isLoading}
    >
      {children}
    </Table>
  );
};

export { WorkersTable };
