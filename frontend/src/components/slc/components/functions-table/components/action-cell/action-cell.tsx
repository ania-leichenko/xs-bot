import { IconButton } from 'components/common/icon-button/icon-button';
import { IconName } from 'common/enums/enums';

const ActionCell = (
  id: string,
  onFunctionDelete: (id: string) => void,
): JSX.Element => {
  return (
    <IconButton
      icon={IconName.TRASH}
      onClick={(): void => onFunctionDelete(id)}
    />
  );
};

export { ActionCell };
