import { FC } from 'react';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { eam as eamActions } from 'store/actions';
import { GroupsTable, WorkersTable, Tenant } from './components/components';
import styles from './styles.module.scss';

const EAM: FC = () => {
  const dispatch = useAppDispatch();

  const { tenantId } = useAppSelector(({ app }) => ({
    tenantId: app.tenant?.id,
  }));

  useEffect(() => {
    if (!tenantId) {
      return;
    }

    dispatch(
      eamActions.loadWorkers({
        tenantId: tenantId as string,
        from: 0,
        count: 5,
      }),
    );

    dispatch(
      eamActions.loadGroups({
        tenantId: tenantId as string,
        from: 0,
        count: 5,
      }),
    );
  }, [dispatch, tenantId]);

  const handleGroupDelete = (id: string): void => {
    dispatch(eamActions.deleteGroup(id));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        EAM - <br />
        Entity Access Management
      </h2>
      <Tenant />
      <div className={styles.tableWrapper}>
        <WorkersTable></WorkersTable>
      </div>
      <GroupsTable onGroupDelete={handleGroupDelete}></GroupsTable>
    </div>
  );
};

export { EAM };
