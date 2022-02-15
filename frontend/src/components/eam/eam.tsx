import { FC } from 'react';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { eam as eamActions } from 'store/actions';
import { GroupsTable } from './components/groups-table/groups-table';
import styles from './eam.module.scss';

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

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        EAM - <br />
        Entity Access Management
      </h2>
      <div className={styles.link}>
        <Link to={AppRoute.EAM_CREATE_WORKER}>Add User</Link>
      </div>
      <GroupsTable />
    </div>
  );
};

export { EAM };
