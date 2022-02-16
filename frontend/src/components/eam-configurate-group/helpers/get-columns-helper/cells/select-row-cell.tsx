import { Checkbox } from 'components/common/common';
import { useState } from 'hooks/hooks';
import { Row } from 'react-table';

const SelectRowCell = (
  { original }: Row<Record<string, string>>,
  selected_workers: Set<string>,
): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);

  if (isChecked) {
    selected_workers.add(original.id);
  } else {
    selected_workers.delete(original.id);
  }
  const checkboxHandler = (): void => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <Checkbox label={''} isChecked={isChecked} onChange={checkboxHandler} />
    </div>
  );
};

export { SelectRowCell };
