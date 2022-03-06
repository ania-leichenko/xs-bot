import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  id: string;
  icon: string;
  onAction: (id: string) => void;
};

const IconButton: FC<Props> = ({ id, icon, onAction }) => {
  const handleAction = (): void => {
    onAction(id);
  };

  return (
    <button className={styles.button} onClick={handleAction}>
      <img src={icon} alt="Action" />
    </button>
  );
};

export { IconButton };
