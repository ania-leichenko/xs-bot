import { AppRoute } from 'common/enums/enums';
import { Button } from 'components/common/common';
import { FC } from 'react';
import styles from './styles.module.scss';

const BS: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        BS - <br />
        Binary Storage
      </h2>
      <Button
        className={styles.addSpaceBtn}
        to={AppRoute.BS_CREATE_SPACE}
        label="Add Space"
      />
    </div>
  );
};

export { BS };
