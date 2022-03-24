import { IconButton } from 'components/common/common';
import { IconName } from 'common/enums/enums';

const ActionCell = (
  id: string,
  onSpaceDelete: (id: string) => void,
): JSX.Element => {
  const handleDelete = (): void => {
    onSpaceDelete(id);
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
