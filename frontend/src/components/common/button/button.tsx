import { FC } from 'react';
import {
  ButtonType,
  ButtonStyle,
  AppRoute,
  ButtonColor,
} from 'common/enums/enums';
import { getValidClasses } from 'helpers/helpers';
import styles from './button.module.scss';
import { Link } from '../link/link';

type Props = {
  label: string;
  to?: AppRoute;
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
  type = ButtonType.BUTTON,
  btnStyle = ButtonStyle.FILLED,
  btnColor = ButtonColor.ORANGE,
  className,
}) => {
  const isLink = Boolean(to);
  const fullClassName = getValidClasses(
    styles.btn,
    styles[`btnColor${btnColor}`],
    styles[`btnStyle${btnStyle}`],
    className,
  );

  return isLink ? (
    <Link className={fullClassName} to={to as AppRoute}>
      {label}
    </Link>
  ) : (
    <button onClick={onClick} type={type} className={fullClassName}>
      {label}
    </button>
  );
};

export { Button };
