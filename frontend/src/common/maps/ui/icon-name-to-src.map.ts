import { IconName } from 'common/enums/enums';
import deleteIcon from 'assets/img/delete-icon.svg';
import editIcon from 'assets/img/edit-icon.svg';
import keyIcon from 'assets/img/key-icon.svg';
import reloadIcon from 'assets/img/reload-icon.svg';
import successIcon from 'assets/img/success-icon.svg';
import errorIcon from 'assets/img/error-icon.svg';
import closeIcon from 'assets/img/close-icon.svg';
import arrowLeftIcon from 'assets/img/arrow-left.svg';
import arrowRightIcon from 'assets/img/arrow-right.svg';
import downloadIcon from 'assets/img/download-icon.svg';

const iconNameToSrc = {
  [IconName.TRASH]: deleteIcon,
  [IconName.GEAR]: editIcon,
  [IconName.KEY]: keyIcon,
  [IconName.RELOAD]: reloadIcon,
  [IconName.SUCCESS]: successIcon,
  [IconName.ERROR]: errorIcon,
  [IconName.CLOSE]: closeIcon,
  [IconName.ARROW_LEFT]: arrowLeftIcon,
  [IconName.ARROW_RIGHT]: arrowRightIcon,
  [IconName.DOWNLOAD]: downloadIcon,
} as const;

export { iconNameToSrc };
