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
import {
  WORKERS_PER_PAGE,
  WORKER_BACK_PAGE,
  WORKER_NEXT_PAGE,
  WORKER_CURRENT_PAGE,
} from 'common/constants/workers.constants';

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
  const allPage = Math.ceil(countItems / WORKERS_PER_PAGE);

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

  const handleLoadWorkers = (from: number): void => {
    dispatch(
      eamActions.loadWorkers({
        tenantId: tenantId as string,
        from: from,
        count: 5,
      }),
    );
  };

  const handleBackPage = (): void => {
    const backPage = currentPage - WORKER_CURRENT_PAGE;
    if (backPage !== 0) {
      setCurrentPage(backPage);
      const backFrom = from - WORKER_BACK_PAGE;
      setFrom(backFrom);
      handleLoadWorkers(from - WORKER_BACK_PAGE);
    }
  };
  const handleNextPage = (): void => {
    const nextPage = currentPage + WORKER_CURRENT_PAGE;
    if (nextPage <= allPage) {
      setCurrentPage(nextPage);
      const nextForm = from + WORKER_NEXT_PAGE;
      setFrom(nextForm);
      handleLoadWorkers(from + WORKER_NEXT_PAGE);
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
        <WorkersTable
          footer={
            <div className={styles.pagination}>
              <div className={styles.countItems}>
                <div className={styles.count}>{countItems + 'results'}</div>
              </div>
              <div className={styles.currentPage}>
                <IconButton
                  onClick={handleBackPage}
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
          }
        >
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
