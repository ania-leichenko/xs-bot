import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  icon: string;
  onClick: () => void;
};

const IconButton: FC<Props> = ({ icon, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img src={icon} alt="Action" />
    </button>
  );
};

export { IconButton };
