import { FC } from 'react';
import { useAppSelector, useMemo } from 'hooks/hooks';
import { Table } from 'components/common/common';
import { getRows, getColumns } from './helpers/helpers';
import { DataStatus } from 'common/enums/enums';

type Props = {
  onFunctionDelete: (id: string) => void;
};

const FunctionsTable: FC<Props> = ({ children, onFunctionDelete }) => {
  const { functions, dataStatus } = useAppSelector(({ slc }) => ({
    functions: slc.functions,
    dataStatus: slc.dataStatus,
  }));

  const isLoading = dataStatus === DataStatus.PENDING;

  const data = useMemo(
    () => getRows({ slcFunctions: functions, onFunctionDelete }),
    [functions],
  );

  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      columns={columns}
      data={data}
      title="Functions"
      placeholder="No functions to display"
      isLoading={isLoading}
    >
      {children}
    </Table>
  );
};

export { FunctionsTable };
