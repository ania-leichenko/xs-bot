import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';
import { DataStatus } from 'common/enums/enums';

type Props = {
  onInstanceDelete: (id: string) => void;
  onKeyClick: (id: string) => void;
};

const InstancesTable: FC<Props> = ({
  children,
  onInstanceDelete,
  onKeyClick,
}) => {
  const { instances, dataStatus } = useAppSelector(({ sc }) => ({
    instances: sc.instances,
    dataStatus: sc.dataStatus,
  }));
  const isLoading = dataStatus === DataStatus.PENDING;

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
      isLoading={isLoading}
    >
      {children}
    </Table>
  );
};

export { InstancesTable };
