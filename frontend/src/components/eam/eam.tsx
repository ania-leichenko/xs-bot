import { FC } from 'react';
import { WorkersTable } from './components/workers-table/workers-table';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { eam as eamActions } from 'store/actions';
import { GroupsTable } from './components/components';
import styles from './styles.module.scss';

const EAM: FC = () => {
  const dispatch = useAppDispatch();

  const { id: tenantId } = useAppSelector(({ app }) => ({
    id: app.tenant?.id,
  }));

  useEffect(() => {
    if (!tenantId) {
      return;
    }

    dispatch(
      eamActions.loadGroups({
        tenantId: tenantId as string,
        from: 0,
        count: 5,
      }),
    );
  }, [dispatch, tenantId]);

  useEffect(() => {
    dispatch(eamActions.getWorkers());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        EAM - <br />
        Entity Access Management
      </h2>
      <GroupsTable />
      <div className={styles.link}>
        <Link to={AppRoute.EAM_CREATE_WORKER}>Add User</Link>
      </div>
      <WorkersTable />
    </div>
  );
};

export { EAM };
