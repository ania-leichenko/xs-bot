import { FC } from 'react';
import { WorkersTable } from './components/workers-table/workers-table';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { eam as workerActions } from 'store/actions';
import styles from './eam.module.scss';

const Eam: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(workerActions.getWorkers());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <WorkersTable />
    </div>
  );
};

export { Eam };
