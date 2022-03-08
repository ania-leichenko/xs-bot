import { IconButton } from 'components/common/icon-button/icon-button';
import { IconName, iconNameToSrc } from 'common/enums/enums';

const ActionCell = (
  id: string,
  onFunctionDelete: (id: string) => void,
): JSX.Element => {
  const handleDelete = (): void => {
    onFunctionDelete(id);
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
