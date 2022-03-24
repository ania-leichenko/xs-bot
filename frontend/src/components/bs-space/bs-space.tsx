import { AppRoute, IconName } from 'common/enums/enums';
import { Button, IconButton } from 'components/common/common';
import { useAppDispatch, useEffect, useParams } from 'hooks/hooks';
import { ObjectsTable } from './components/components';
import { FC } from 'react';
import styles from './styles.module.scss';
import { BSSpace as BSSpaceActions } from 'store/actions';

const BSSpace: FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(
      BSSpaceActions.loadObjects({
        filter: {
          from: 0,
          count: 5,
        },
        params: {
          id: id as string,
        },
      }),
    );
  }, [dispatch]);

  const handleObjectsReload = (): void => {
    dispatch(
      BSSpaceActions.loadObjects({
        filter: {
          from: 0,
          count: 5,
        },
        params: {
          id: id as string,
        },
      }),
    );
  };
  //
  // const handleObjectDownload = (id: string): void => {
  //   dispatch(BSSpaceActions.downloadObject(id));
  // };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        BS - <br />
        Binary Storage
      </h2>
      <div className={styles.tableWrapper}>
        <ObjectsTable>
          <div className={styles.buttonsBlock}>
            <IconButton
              onClick={handleObjectsReload}
              icon={IconName.RELOAD}
              label="Reload"
            />
            <Button
              className={styles.addSpaceBtn}
              to={AppRoute.BS_SPACE_$ID}
              label="Upload file"
            />
          </div>
        </ObjectsTable>
      </div>
    </div>
  );
};

export { BSSpace };
