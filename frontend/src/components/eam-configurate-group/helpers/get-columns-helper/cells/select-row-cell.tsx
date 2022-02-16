import { Checkbox } from 'components/common/common';
import { useState } from 'hooks/hooks';
import { storage } from 'services/services';
import { CellProps } from 'react-table';
const selected_workers = new Set();
import { StorageKey } from 'common/enums/enums';

const SelectRowCell = ({
  row,
}: CellProps<Record<string, string>>): JSX.Element => {
  // how do it without storage?
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

export { SelectRowCell };
