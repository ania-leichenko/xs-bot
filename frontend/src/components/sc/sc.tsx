import { FC } from 'react';
import copy from 'copy-to-clipboard';
import { AppRoute } from 'common/enums/enums';
import { useAppDispatch, useEffect, useAppSelector } from 'hooks/hooks';
import { sc as scActions } from 'store/actions';
import { InstancesTable } from './components/components';
import { Button } from 'components/common/common';
import styles from './styles.module.scss';

const SC: FC = () => {
  const dispatch = useAppDispatch();
  const { sshKey } = useAppSelector(({ sc }) => ({
    sshKey: sc.sshKey,
  }));

  useEffect(() => {
    dispatch(
      scActions.loadInstances({
        from: 0,
        count: 5,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (sshKey) {
      copy(sshKey.sshKey, {
        message: 'copied',
      });
    }

    return (): void => {
      dispatch(scActions.cleanupSshKey());
    };
  }, [sshKey, dispatch]);

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
        >
          <Button
            className={styles.addInstanceBtn}
            to={AppRoute.SC_CONFIGURATE_INSTANCE}
            label="Add Instance"
          />
        </InstancesTable>
      </div>
    </div>
  );
};

export { SC };
