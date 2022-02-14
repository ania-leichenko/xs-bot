import { FC } from 'react';
import { ButtonType, ButtonStyle, AppRoute } from 'common/enums/enums';
import { getValidClasses } from 'helpers/helpers';
import styles from './button.module.scss';
import { Link } from '../link/link';

type Props = {
  label: string;
  to?: AppRoute;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  btnStyle?: ButtonStyle;
};

const Button: FC<Props> = ({
  label,
  to,
  onClick,
  type = ButtonType.BUTTON,
  btnStyle = ButtonStyle.FILLED,
}) => {
  const isLink = Boolean(to);
  return isLink ? (
    <Link
      className={getValidClasses(styles.btn, styles[`btnStyle${btnStyle}`])}
      to={to as AppRoute}
    >
      {label}
    </Link>
  ) : (
    <button
      onClick={onClick}
      type={type}
      className={getValidClasses(styles.btn, styles[`btnStyle${btnStyle}`])}
    >
      {label}
    </button>
  );
};

export { Button };
