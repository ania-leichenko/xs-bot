import { useAppDispatch, useEffect, useParams } from 'hooks/hooks';
import { ObjectsTable } from './components/components';
import React, { FC } from 'react';
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
        id: id as string,
      }),
    );
  }, [dispatch]);

  const handleObjectDownload = (objectId: string): void => {
    dispatch(
      BSSpaceActions.downloadObject({
        spaceId: id as string,
        objectId,
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        BS - <br />
        Binary Storage
      </h2>
      <div className={styles.tableWrapper}>
        <ObjectsTable
          spaceId={id as string}
          onObjectDownload={handleObjectDownload}
        ></ObjectsTable>
      </div>
    </div>
  );
};

export { BSSpace };
