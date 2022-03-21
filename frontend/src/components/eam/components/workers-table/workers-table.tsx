import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/table/table';
import { getRows, getColumns } from './helpers/helpers';

type Props = {
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

const WorkersTable: FC<Props> = ({ children, footer }) => {
  const { workers } = useAppSelector(({ eam }) => ({
    workers: eam.workers,
  }));

  const data = useMemo(() => getRows(workers), [workers]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Workers"
      placeholder="No workers to display"
      footer={footer}
    >
      {children}
    </Table>
  );
};

export { WorkersTable };
