import { FC } from 'react';
import styles from './styles.module.scss';
import { Button } from '../common/button/button';
import { AppRoute } from '../../common/enums/app/app-route.enum';

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
