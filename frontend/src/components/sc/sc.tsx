import { FC } from 'react';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { sc as scActions } from 'store/actions';
import { InstancesTable } from './components/components';
import styles from './styles.module.scss';

const SC: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      scActions.loadInstances({
        from: 0,
        count: 5,
      }),
    );
  }, [dispatch]);

  const handleDeleteInstance = (id: string): void => {
    dispatch(scActions.deleteInstance(id));
  };

  const handleCopyKey = (keyId: string): void => {
    dispatch(scActions.loadSshKey(keyId));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        SC - <br />
        Server Computing
      </h2>
      <div className={styles.tableWrapper}>
        <InstancesTable
          onInstanceDelete={handleDeleteInstance}
          onKeyClick={handleCopyKey}
        ></InstancesTable>
      </div>
    </div>
  );
};

export { SC };
