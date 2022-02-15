import { FC } from 'react';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import styles from './eam.module.scss';

const EAM: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        EAM - <br />
        Entity Access Management
      </h2>
      <div className={styles.link}>
        <Link to={AppRoute.EAM_CREATE_WORKER}>Add User</Link>
      </div>
    </div>
  );
};

export { EAM };
