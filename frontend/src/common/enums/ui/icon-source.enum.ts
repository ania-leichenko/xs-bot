import { IconName } from './icon-name.enum';
import deleteIcon from 'assets/img/delete-icon.svg';
import editIcon from 'assets/img/edit-icon.svg';
import keyIcon from 'assets/img/key-icon.svg';
import reloadIcon from 'assets/img/reload-icon.svg';

const IconSource = {
  [IconName.TRASH]: deleteIcon,
  [IconName.GEAR]: editIcon,
  [IconName.KEY]: keyIcon,
  [IconName.RELOAD]: reloadIcon,
} as const;

export { IconSource };
