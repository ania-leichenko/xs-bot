import { FC } from 'react';
import { AppRoute } from 'common/enums/enums';
import { Button } from 'components/common/common';
import styles from './styles.module.scss';

const SLC: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        SLC - <br />
        ServerLess Computing
      </h2>
      <Button
        className={styles.addFunctionBtn}
        to={AppRoute.SLC_CONFIGURATE_FUNCTION}
        label="Create function"
      />
    </div>
  );
};

export { SLC };
