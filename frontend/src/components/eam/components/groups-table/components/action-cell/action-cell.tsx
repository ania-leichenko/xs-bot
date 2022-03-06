import { IconButton } from 'components/common/common';
import deleteIcon from 'assets/img/delete-icon.svg';

const ActionCell = (
  id: string,
  onGroupDelete: (id: string) => void,
): JSX.Element => {
  return <IconButton id={id} icon={deleteIcon} onAction={onGroupDelete} />;
};

export { ActionCell };
