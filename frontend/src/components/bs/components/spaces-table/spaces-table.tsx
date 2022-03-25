import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';
import { DataStatus } from 'common/enums/enums';

type Props = {
  onSpaceDelete: (id: string) => void;
};

const SpacesTable: FC<Props> = ({ children, onSpaceDelete }) => {
  const { spaces, dataStatus } = useAppSelector(({ bs }) => ({
    spaces: bs.spaces,
    dataStatus: bs.dataStatus,
  }));
  const isLoading = dataStatus === DataStatus.PENDING;

  const data = useMemo(() => getRows({ spaces, onSpaceDelete }), [spaces]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Spaces"
      placeholder="No spaces to display"
      isLoading={isLoading}
    >
      {children}
    </Table>
  );
};

export { SpacesTable };
