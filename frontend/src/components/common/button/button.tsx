import { FC } from 'react';
import {
  ButtonType,
  ButtonStyle,
  AppRoute,
  ButtonColor,
} from 'common/enums/enums';
import { getValidClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import { Link } from '../link/link';

type Props = {
  label?: string;
  to?: AppRoute;
  icon?: string;
  iconName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  btnStyle?: ButtonStyle;
  btnColor?: ButtonColor;
  className?: string;
};

const Button: FC<Props> = ({
  label,
  to,
  onClick,
  icon,
  iconName,
  type = ButtonType.BUTTON,
  btnStyle = ButtonStyle.FILLED,
  btnColor = ButtonColor.ORANGE,
  className,
}) => {
  const isLink = Boolean(to);
  const isIcon = Boolean(icon);
  const fullClassName = getValidClasses(
    styles.btn,
    styles[`btnColor${btnColor}`],
    styles[`btnStyle${btnStyle}`],
    className,
  );

  return isLink ? (
    <Link className={isIcon ? className : fullClassName} to={to as AppRoute}>
      {isIcon ? <img src={icon} alt={iconName} /> : label}
    </Link>
  ) : (
    <button
      className={isIcon ? className : fullClassName}
      onClick={onClick}
      type={type}
    >
      {isIcon ? <img src={icon} alt={iconName} /> : label}
    </button>
  );
};

export { Button };
