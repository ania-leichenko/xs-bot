import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { BSSpaceDeleteParamsDto } from 'common/types/types';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';

type Props = {
  children: JSX.Element;
  handleSpaceDelete: ({ id }: BSSpaceDeleteParamsDto) => void;
};

const SpacesTable: FC<Props> = ({ children, handleSpaceDelete }) => {
  const { spaces } = useAppSelector(({ bs }) => ({
    spaces: bs.spaces,
  }));

  const data = useMemo(() => getRows({ spaces, handleSpaceDelete }), [spaces]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table columns={columns} data={data} title="Spaces">
      {children}
    </Table>
  );
};

export { SpacesTable };
