import { IconButton } from 'components/common/common';
import { IconName, iconNameToSrc } from 'common/enums/enums';

const ActionCell = (
  id: string,
  onSpaceDelete: (id: string) => void,
): JSX.Element => {
  const handleDelete = (): void => {
    onSpaceDelete(id);
  };
  return (
    <IconButton
      icon={iconNameToSrc[IconName.TRASH]}
      name="Delete"
      onClick={handleDelete}
    />
  );
};

export { ActionCell };
