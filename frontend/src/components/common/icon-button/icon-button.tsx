import { FC } from 'react';
import styles from './styles.module.scss';
import { Button } from 'components/common/common';
import { IconName, AppRoute } from 'common/enums/enums';

type Props = {
  icon: IconName;
  label: string;
  onClick?: () => void;
  to?: AppRoute | string;
};

const IconButton: FC<Props> = ({ icon, label, onClick, to }) => {
  return (
    <Button
      icon={icon}
      label={label}
      onClick={onClick}
      className={styles.button}
      to={to}
    />
  );
};

export { IconButton };
