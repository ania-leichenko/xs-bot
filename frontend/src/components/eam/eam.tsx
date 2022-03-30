import { FC } from 'react';
import {
  Button,
  ConfirmDeletePopup,
  IconButton,
} from 'components/common/common';
import { AppRoute, EntityType, IconName } from 'common/enums/enums';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { eam as eamActions } from 'store/actions';
import { GroupsTable, Tenant, WorkersTable } from './components/components';
import styles from './styles.module.scss';

const EAM: FC = () => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);
  const [currentWorkerId, setCurrentWorkerId] = useState<string | null>(null);

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
    setIsVisible(true);
    setCurrentGroupId(id);
  };

  const handleWorkersDelete = (id: string): void => {
    setIsVisible(true);
    setCurrentWorkerId(id);
  };

  const handleCancelDelete = (): void => {
    setIsVisible(false);
    currentGroupId ? setCurrentGroupId(null) : setCurrentWorkerId(null);
  };

  const handleConfirmDelete = (): void => {
    if (currentGroupId) {
      dispatch(eamActions.deleteGroup(currentGroupId as string));
      setCurrentGroupId(null);
    } else {
      dispatch(eamActions.deleteWorker(currentWorkerId as string));
      setCurrentWorkerId(null);
    }

    setIsVisible(false);
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

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          EAM - <br />
          Entity Access Management
        </h2>
        <Tenant />
        <div className={styles.tableWrapper}>
          <WorkersTable onWorkerDelete={handleWorkersDelete}>
            <div className={styles.buttonsBlock}>
              <IconButton
                onClick={handleWorkersReload}
                icon={IconName.RELOAD}
                label="Reload"
                title="Refresh"
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
              title="Refresh"
            />
            <Button
              className={styles.addGroupBtn}
              to={AppRoute.EAM_CONFIGURATE_GROUP}
              label="Add Group"
            />
          </div>
        </GroupsTable>
        <ConfirmDeletePopup
          isOpen={isVisible}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          entityType={currentGroupId ? EntityType.GROUP : EntityType.WORKER}
        />
      </div>
    </>
  );
};

export { EAM };
