import { IconButton } from 'components/common/icon-button/icon-button';
import { IconName } from 'common/enums/enums';

const ActionCell = (
  id: string,
  onFunctionDelete: (id: string) => void,
): JSX.Element => {
  const handleDelete = (): void => {
    onFunctionDelete(id);
  };
  return (
    <IconButton icon={IconName.TRASH} label="Delete" onClick={handleDelete} />
  );
};

export { ActionCell };
