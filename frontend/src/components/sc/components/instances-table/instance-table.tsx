import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';

const InstancesTable: FC = ({ children }) => {
  const { instances } = useAppSelector(({ sc }) => ({
    instances: sc.instances,
  }));

  const data = useMemo(() => getRows(instances), [instances]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table columns={columns} data={data} title="Instances">
      {children}
    </Table>
  );
};

export { InstancesTable };
