import { FC } from 'react';
import styles from './styles.module.scss';
import { AppRoute } from '../../common/enums/app/app-route.enum';
import { Link } from '../common/link/link';

const NotFound: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h5 className={styles.title}>Page Not Found</h5>
        <Link className={styles.link} to={AppRoute.ROOT}>
          Back to home
        </Link>
      </div>
    </div>
  );
};

export { NotFound };
