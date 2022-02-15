import { FC } from 'react';
import { WorkersTable } from './components/workers-table/workers-table';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { eam as eamActions } from 'store/actions';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import styles from './eam.module.scss';

const EAM: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(eamActions.getWorkers());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        EAM - <br />
        Entity Access Management
      </h2>
      <div className={styles.link}>
        <Link to={AppRoute.EAM_CREATE_WORKER}>Add User</Link>
      </div>
      <WorkersTable />
    </div>
  );
};

export { EAM };
