import { FC } from 'react';
import { ServicesList } from './components/components';
import { SERVICE_MENU_ITEMS } from './common/constants';
import styles from './styles.module.scss';

const Dashboard: FC = () => (
  <div className={styles.wrapper}>
    <ServicesList services={SERVICE_MENU_ITEMS} />
  </div>
);

export { Dashboard };
