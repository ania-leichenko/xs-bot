import { FC } from 'react';
import { AppRoute, EntityType, IconName } from 'common/enums/enums';
import {
  Button,
  ConfirmDeletePopup,
  IconButton,
} from 'components/common/common';
import styles from './styles.module.scss';
import { FunctionsTable } from './components/components';
import { useAppDispatch, useEffect, useState } from 'hooks/hooks';
import { slc as slcActions } from 'store/actions';

const SLC: FC = () => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [currentFunctionId, setCurrentFunctionId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    dispatch(
      slcActions.loadFunctions({
        from: 0,
        count: 5,
      }),
    );
  }, [dispatch]);

  const handleFunctionDelete = (id: string): void => {
    setIsVisible(true);
    setCurrentFunctionId(id);
  };

  const handleCancelDelete = (): void => {
    setIsVisible(false);
    setCurrentFunctionId(null);
  };

  const handleConfirmDelete = (): void => {
    dispatch(slcActions.deleteFunction(currentFunctionId as string));
    setCurrentFunctionId(null);
    setIsVisible(false);
  };

  const handleFunctionReload = (): void => {
    dispatch(
      slcActions.loadFunctions({
        from: 0,
        count: 5,
      }),
    );
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          SLC - <br />
          ServerLess Computing
        </h2>
        <div className={styles.tableWrapper}>
          <FunctionsTable onFunctionDelete={handleFunctionDelete}>
            <div className={styles.buttonsBlock}>
              <IconButton
                title="Refresh"
                onClick={handleFunctionReload}
                icon={IconName.RELOAD}
                label="Reload"
              />
              <Button
                className={styles.addFunctionBtn}
                to={AppRoute.SLC_CONFIGURATE_FUNCTION}
                label="Create function"
              />
            </div>
          </FunctionsTable>
        </div>
      </div>
      <ConfirmDeletePopup
        isOpen={isVisible}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        entityType={EntityType.FUNCTION}
      />
    </>
  );
};

export { SLC };
