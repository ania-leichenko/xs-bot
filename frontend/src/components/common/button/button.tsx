import { FC } from 'react';
import {
  AppRoute,
  ButtonColor,
  ButtonStyle,
  ButtonType,
  IconName,
} from 'common/enums/enums';
import { getValidClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import { Link } from '../link/link';
import deleteIcon from 'assets/img/delete-icon.svg';
import editIcon from 'assets/img/edit-icon.svg';
import keyIcon from 'assets/img/key-icon.svg';
import reloadIcon from 'assets/img/reload-icon.svg';
import arrowLeftIcon from 'assets/img/arrow-left.svg';
import arrowRightIcon from 'assets/img/arrow-right.svg';

type Props = {
  label: string;
  to?: AppRoute | string;
  icon?: IconName;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  btnStyle?: ButtonStyle;
  btnColor?: ButtonColor;
  className?: string;
  isDisabled?: boolean;
};

const Button: FC<Props> = ({
  label,
  to,
  onClick,
  icon,
  type = ButtonType.BUTTON,
  btnStyle = ButtonStyle.FILLED,
  btnColor = ButtonColor.ORANGE,
  className,
  isDisabled,
}) => {
  const isLink = Boolean(to);
  const fullClassName = getValidClasses(
    styles.btn,
    styles[`btnColor${btnColor}`],
    styles[`btnStyle${btnStyle}`],
    className,
  );

  const iconNameToSrc = {
    [IconName.TRASH]: deleteIcon,
    [IconName.GEAR]: editIcon,
    [IconName.KEY]: keyIcon,
    [IconName.RELOAD]: reloadIcon,
    [IconName.ARROW_LEFT]: arrowLeftIcon,
    [IconName.ARROW_RIGHT]: arrowRightIcon,
  };

  return isLink ? (
    <Link className={icon ? className : fullClassName} to={to as AppRoute}>
      {icon ? <img src={iconNameToSrc[icon]} alt={label} /> : label}
    </Link>
  ) : (
    <button
      className={icon ? className : fullClassName}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
    >
      {icon ? <img src={iconNameToSrc[icon]} alt={label} /> : label}
    </button>
  );
};

export { Button };
