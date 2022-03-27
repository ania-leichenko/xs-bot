import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';

type Props = {
  onObjectDownload: (objectId: string) => void;
};

const ObjectsTable: FC<Props> = ({ children, onObjectDownload }) => {
  const { objects } = useAppSelector(({ BSSpace }) => ({
    objects: BSSpace.objects,
  }));

  const data = useMemo(() => getRows({ objects, onObjectDownload }), [objects]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Objects"
      placeholder="No objects to display"
    >
      {children}
    </Table>
  );
};

export { ObjectsTable };
