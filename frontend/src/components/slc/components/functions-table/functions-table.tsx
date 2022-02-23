import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';

const FunctionsTable: FC = ({ children }) => {
  const { functions } = useAppSelector(({ slc }) => ({
    functions: slc.functions,
  }));

  const data = useMemo(() => getRows(functions), [functions]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table columns={columns} data={data} title="Functions">
      {children}
    </Table>
  );
};

export { FunctionsTable };
