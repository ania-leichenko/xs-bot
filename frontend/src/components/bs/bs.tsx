import { AppRoute, EntityType, IconName } from 'common/enums/enums';
import {
  Button,
  ConfirmDeletePopup,
  IconButton,
} from 'components/common/common';
import { useAppDispatch, useEffect, useState } from 'hooks/hooks';
import { SpacesTable } from './components/components';
import { FC } from 'react';
import styles from './styles.module.scss';
import { bs as bsActions } from 'store/actions';

const BS: FC = () => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSpaceId, setCurrentSpaceId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(
      bsActions.loadSpaces({
        from: 0,
        count: 5,
      }),
    );
  }, [dispatch]);

  const handleSpaceDelete = (id: string): void => {
    setIsVisible(true);
    setCurrentSpaceId(id);
  };

  const handleCancelDelete = (): void => {
    setIsVisible(false);
    setCurrentSpaceId(null);
  };

  const handleConfirmDelete = (): void => {
    dispatch(bsActions.deleteSpace(currentSpaceId as string));
    setCurrentSpaceId(null);
    setIsVisible(false);
  };

  const handleSpacesReload = (): void => {
    dispatch(
      bsActions.loadSpaces({
        from: 0,
        count: 5,
      }),
    );
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          BS - <br />
          Binary Storage
        </h2>
        <div className={styles.tableWrapper}>
          <SpacesTable onSpaceDelete={handleSpaceDelete}>
            <div className={styles.buttonsBlock}>
              <IconButton
                onClick={handleSpacesReload}
                icon={IconName.RELOAD}
                label="Reload"
                title="Refresh"
              />
              <Button
                className={styles.addSpaceBtn}
                to={AppRoute.BS_CREATE_SPACE}
                label="Add Space"
              />
            </div>
          </SpacesTable>
        </div>
      </div>
      <ConfirmDeletePopup
        isOpen={isVisible}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        entityType={EntityType.SPACE}
      />
    </>
  );
};

export { BS };
