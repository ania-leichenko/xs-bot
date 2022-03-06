import deleteIcon from 'assets/img/delete-icon.svg';
import { IconButton } from 'components/common/common';

const ActionCell = (
  id: string,
  onSpaceDelete: (id: string) => void,
): JSX.Element => {
  return <IconButton id={id} icon={deleteIcon} onAction={onSpaceDelete} />;
};

export { ActionCell };
