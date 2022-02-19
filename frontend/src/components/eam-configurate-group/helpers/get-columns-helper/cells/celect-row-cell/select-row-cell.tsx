import { Checkbox } from 'components/common/common';
import { Row } from 'react-table';

const SelectRowCell = (
  { original }: Row<Record<string, string>>,
  handleAddWorkerId: (id: string) => void,
  handleRemoveWorkerId: (id: string) => void,
  handleIsCheckedId: (id: string) => boolean,
): JSX.Element => {
  const handleCheckbox = (): void => {
    if (!handleIsCheckedId(original.id)) {
      handleAddWorkerId(original.id);
    } else {
      handleRemoveWorkerId(original.id);
    }
  };
  return (
    <div>
      <Checkbox
        label={''}
        isChecked={handleIsCheckedId(original.id)}
        onChange={handleCheckbox}
      />
    </div>
  );
};

export { SelectRowCell };
