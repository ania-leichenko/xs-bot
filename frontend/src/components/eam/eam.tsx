import { FC } from 'react';
import { Button, IconButton } from 'components/common/common';
import { AppRoute, IconName } from 'common/enums/enums';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { eam as eamActions } from 'store/actions';
import { GroupsTable, WorkersTable, Tenant } from './components/components';
import styles from './styles.module.scss';

const EAM: FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [from, setFrom] = useState(0);

  const { id: tenantId, countItems: countItems } = useAppSelector(
    ({ app, eam }) => ({
      id: app.tenant?.id,
      countItems: eam.countItems,
    }),
  );
  const allPage = Math.ceil(countItems / 5);

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

  const handleWorkersReload = (): void => {
    dispatch(
      eamActions.loadWorkers({
        tenantId: tenantId as string,
        from: 0,
        count: 5,
      }),
    );
  };
  const handleGroupsReload = (): void => {
    dispatch(
      eamActions.loadGroups({
        tenantId: tenantId as string,
        from: 0,
        count: 5,
      }),
    );
  };

  const handleForwardPage = (): void => {
    const forwardPage = currentPage - 1;
    if (forwardPage !== 0) {
      setCurrentPage(forwardPage);
      const forwardFrom = from - 5;
      setFrom(forwardFrom);
      dispatch(
        eamActions.loadWorkers({
          tenantId: tenantId as string,
          from: forwardFrom,
          count: 5,
        }),
      );
    }
  };
  const handleNextPage = (): void => {
    const nextPage = currentPage + 1;
    if (nextPage <= allPage) {
      setCurrentPage(nextPage);
      const nextForm = from + 5;
      setFrom(nextForm);
      dispatch(
        eamActions.loadWorkers({
          tenantId: tenantId as string,
          from: nextForm,
          count: 5,
        }),
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        EAM - <br />
        Entity Access Management
      </h2>
      <Tenant />
      <div className={styles.tableWrapper}>
        <WorkersTable>
          <div className={styles.buttonsBlock}>
            <IconButton
              onClick={handleWorkersReload}
              icon={IconName.RELOAD}
              label="Reload"
            />
            <Button
              className={styles.addWorkerBtn}
              to={AppRoute.EAM_CREATE_WORKER}
              label="Add Worker"
            />
          </div>
          <div className={styles.pagination}>
            <div className={styles.count}>{countItems + 'results'}</div>
            <div className={styles.currentPage}>
              <IconButton
                onClick={handleForwardPage}
                icon={IconName.ARROW_LEFT}
                label="ArrowRight"
              />
              <div>{currentPage}</div>
              <div className={styles.count}>of {allPage}</div>
              <IconButton
                onClick={handleNextPage}
                icon={IconName.ARROW_RIGHT}
                label="ArrowRight"
              />
            </div>
          </div>
        </WorkersTable>
      </div>
      <GroupsTable onGroupDelete={handleGroupDelete}>
        <div className={styles.buttonsBlock}>
          <IconButton
            onClick={handleGroupsReload}
            icon={IconName.RELOAD}
            label="Reload"
          />
          <Button
            className={styles.addGroupBtn}
            to={AppRoute.EAM_CONFIGURATE_GROUP}
            label="Add Group"
          />
        </div>
      </GroupsTable>
    </div>
  );
};

export { EAM };
