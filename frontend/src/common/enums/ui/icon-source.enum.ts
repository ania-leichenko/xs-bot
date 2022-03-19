import { IconName } from './icon-name.enum';
import deleteIcon from 'assets/img/delete-icon.svg';
import editIcon from 'assets/img/edit-icon.svg';
import keyIcon from 'assets/img/key-icon.svg';
import reloadIcon from 'assets/img/reload-icon.svg';
import successIcon from 'assets/img/success-icon.svg';
import errorIcon from 'assets/img/error-icon.svg';
import closeIcon from 'assets/img/close-icon.svg';

const IconSource = {
  [IconName.TRASH]: deleteIcon,
  [IconName.GEAR]: editIcon,
  [IconName.KEY]: keyIcon,
  [IconName.RELOAD]: reloadIcon,
  [IconName.SUCCESS]: successIcon,
  [IconName.ERROR]: errorIcon,
  [IconName.CLOSE]: closeIcon,
} as const;

export { IconSource };
