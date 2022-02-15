import { FC } from 'react';
import { WorkersTable } from './components/workers-table/workers-table';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { eam as eamActions } from 'store/actions';
import styles from './eam.module.scss';

const Eam: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(eamActions.getWorkers());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <WorkersTable />
    </div>
  );
};

export { Eam };
