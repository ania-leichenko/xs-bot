import { Header } from 'components/common/common';
import { FC } from 'react';
import styles from './eam.module.scss';

const Eam: FC = () => {
  return (
    <div>
      <Header />
      <div className={styles.link}></div>
    </div>
  );
};

export { Eam };
