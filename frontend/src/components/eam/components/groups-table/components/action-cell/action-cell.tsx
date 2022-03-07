import { IconButton } from 'components/common/common';
import { IconName } from 'common/enums/enums';

const ActionCell = (
  id: string,
  onGroupDelete: (id: string) => void,
): JSX.Element => {
  return (
    <IconButton icon={IconName.TRASH} onClick={(): void => onGroupDelete(id)} />
  );
};

export { ActionCell };
