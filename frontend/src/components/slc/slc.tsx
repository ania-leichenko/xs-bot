import { FC } from 'react';
import { AppRoute } from 'common/enums/enums';
import { Button } from 'components/common/common';
import styles from './styles.module.scss';
import { FunctionsTable } from './components/components';

const SLC: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        SLC - <br />
        ServerLess Computing
      </h2>
      <div className={styles.tableWrapper}>
        <FunctionsTable>
          <Button
            className={styles.addFunctionBtn}
            to={AppRoute.SLC_CONFIGURATE_FUNCTION}
            label="Create function"
          />
        </FunctionsTable>
      </div>
    </div>
  );
};

export { SLC };
