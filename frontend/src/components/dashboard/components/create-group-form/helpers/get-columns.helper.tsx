import { UsersTableHeader, UsersTableAccessor } from 'common/enums/enums';
import { Checkbox } from 'components/common/common';
import { useState } from 'hooks/hooks';

type Column = {
  Header: string;
  accessor: string;
  Cell?: typeof checkboxHandler;
};

const checkboxHandler = (): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxHandler = (): void => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <Checkbox label={''} isChecked={isChecked} onChange={checkboxHandler} />
    </div>
  );
};

const getColumns = (): Column[] => {
  return [
    {
      Header: '',
      accessor: 'check',
      Cell: checkboxHandler,
    },
    {
      Header: UsersTableHeader.USERNAME,
      accessor: UsersTableAccessor.USERNAME,
    },
    {
      Header: UsersTableHeader.TENANT_ID,
      accessor: UsersTableAccessor.TENANT_ID,
    },
  ];
};

export { getColumns };
