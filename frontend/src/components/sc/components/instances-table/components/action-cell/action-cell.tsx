import deleteIcon from 'assets/img/delete-icon.svg';
import { IconButton } from 'components/common/icon-button/icon-button';

const ActionCell = (
  id: string,
  onDeleteInstance: (id: string) => void,
): JSX.Element => {
  return <IconButton id={id} icon={deleteIcon} onAction={onDeleteInstance} />;
};

export { ActionCell };
