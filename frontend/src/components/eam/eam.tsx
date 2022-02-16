import { FC } from 'react';
import { WorkersTable } from './components/components';
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
      eamActions.getWorkers({
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

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        EAM - <br />
        Entity Access Management
      </h2>
      <div className={styles.link}>
        <Link to={AppRoute.EAM_CREATE_WORKER}>Add User</Link>
      </div>
      <div className={styles.tables}>
        <WorkersTable />
        <GroupsTable />
      </div>
    </div>
  );
};

export { EAM };
