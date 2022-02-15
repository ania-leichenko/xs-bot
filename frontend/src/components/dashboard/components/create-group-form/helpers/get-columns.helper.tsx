import {
  UsersTableHeader,
  UsersTableAccessor,
  StorageKey,
} from 'common/enums/enums';
import { Checkbox } from 'components/common/common';
import { useState } from 'hooks/hooks';
import { storage } from 'services/services';

type Column = {
  Header: string;
  accessor: string;
  Cell?: typeof checkboxHandler;
};

const selected_workers = new Set();

const checkboxHandler = ({ row }: unknown): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);
  if (isChecked) {
    selected_workers.add(row.original.id);
    storage.setItem(
      StorageKey.SELECTED_WORKERS,
      JSON.stringify([...selected_workers.values()]),
    );
  } else {
    selected_workers.delete(row.original.id);
    storage.setItem(
      StorageKey.SELECTED_WORKERS,
      JSON.stringify([...selected_workers.values()]),
    );
  }
  const checkboxHandler = (): void => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <Checkbox
        label={''}
        isChecked={selected_workers.has(row.original.id)}
        onChange={checkboxHandler}
      />
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
