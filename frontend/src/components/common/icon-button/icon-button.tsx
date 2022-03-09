import { FC } from 'react';
import styles from './styles.module.scss';
import { Button } from 'components/common/common';
import { IconName } from 'common/enums/ui/icon-name.enum';

type Props = {
  icon: IconName;
  label: string;
  onClick: () => void;
};

const IconButton: FC<Props> = ({ icon, label, onClick }) => {
  return (
    <Button
      icon={icon}
      label={label}
      onClick={onClick}
      className={styles.button}
    />
  );
};

export { IconButton };
