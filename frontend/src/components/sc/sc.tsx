import { FC } from 'react';
import { AppRoute } from 'common/enums/enums';
import { Button } from 'components/common/common';
import styles from './styles.module.scss';

const SC: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        SC - <br />
        Server Computing
      </h2>
      <Button
        className={styles.addInstanceBtn}
        to={AppRoute.SC_CONFIGURATE_INSTANCE}
        label="Add Instance"
      />
    </div>
  );
};

export { SC };
