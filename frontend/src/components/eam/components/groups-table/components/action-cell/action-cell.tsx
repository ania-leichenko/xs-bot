import { IconButton } from 'components/common/common';
import { IconName } from 'common/enums/enums';

const ActionCell = (
  id: string,
  onGroupDelete: (id: string) => void,
): JSX.Element => {
  const handleDelete = (): void => {
    onGroupDelete(id);
  };
  return (
    <IconButton
      title="Delete"
      icon={IconName.TRASH}
      label="Delete"
      onClick={handleDelete}
    />
  );
};

export { ActionCell };
