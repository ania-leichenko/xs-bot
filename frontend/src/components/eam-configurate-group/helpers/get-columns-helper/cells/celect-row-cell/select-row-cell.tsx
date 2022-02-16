import { Checkbox } from 'components/common/common';
import { useEffect, useState } from 'hooks/hooks';
import { Row } from 'react-table';

const SelectRowCell = (
  { original }: Row<Record<string, string>>,
  addWorkerId: (id: string) => void,
  removeWorkersId: (id: string) => void,
): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (isChecked) {
      addWorkerId(original.id);
    } else {
      removeWorkersId(original.id);
    }
  }, [isChecked]);

  const handleCheckbox = (): void => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <Checkbox label={''} isChecked={isChecked} onChange={handleCheckbox} />
    </div>
  );
};

export { SelectRowCell };
