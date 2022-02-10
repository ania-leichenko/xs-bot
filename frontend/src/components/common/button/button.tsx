import { ButtonType, ButtonStyle } from 'common/enums/enums';
import { getValidClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
  btnStyle?: ButtonStyle;
};

const Button: React.FC<Props> = ({
  label,
  onClick,
  type = ButtonType.BUTTON,
  btnStyle = ButtonStyle.FILLED,
}) => (
  <button
    onClick={onClick}
    type={type}
    className={getValidClasses(styles.btn, styles[`btnStyle--${btnStyle}`])}
  >
    {label}
  </button>
);

export { Button };
