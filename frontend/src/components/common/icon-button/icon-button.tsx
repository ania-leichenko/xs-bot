import { FC } from 'react';
import styles from './styles.module.scss';
import { Button } from 'components/common/common';

type Props = {
  icon: string;
  name: string;
  onClick: () => void;
};

const IconButton: FC<Props> = ({ icon, name, onClick }) => {
  return (
    <Button
      icon={icon}
      iconName={name}
      onClick={onClick}
      className={styles.button}
    />
  );
};

export { IconButton };
