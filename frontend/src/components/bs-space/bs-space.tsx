import { IconName } from 'common/enums/enums';
import { IconButton } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from 'hooks/hooks';
import { ObjectsTable } from './components/components';
import React, { FC } from 'react';
import styles from './styles.module.scss';
import { BSSpace as BSSpaceActions } from 'store/actions';

const BSSpace: FC = () => {
  const objects = useAppSelector((state) => state.BSSpace.objects);
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

  const handleObjectsReload = (): void => {
    dispatch(
      BSSpaceActions.loadObjects({
        filter: {
          from: 0,
          count: 5,
        },
        id: id as string,
      }),
    );
  };

  const handleObjectDownload = (objectId: string): void => {
    const filename = getFilenameById(objectId);

    if (!filename) {
      return;
    }

    dispatch(
      BSSpaceActions.downloadObject({
        filename,
        spaceId: id as string,
        objectId,
      }),
    );
  };

  const handleUploading = (e: React.FormEvent<HTMLInputElement>): void => {
    const files = e.currentTarget.files;

    if (!files) {
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);

    dispatch(BSSpaceActions.uploadObject({ id: id as string, file: formData }));
  };

  const getFilenameById = (id: string): string => {
    const object = objects.filter((obj) => obj.id === id);
    return object[0].name;
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        BS - <br />
        Binary Storage
      </h2>
      <div className={styles.tableWrapper}>
        <ObjectsTable onObjectDownload={handleObjectDownload}>
          <div className={styles.buttonsBlock}>
            <IconButton
              onClick={handleObjectsReload}
              icon={IconName.RELOAD}
              label="Reload"
            />
            <input
              id="file-input"
              className={styles.hideDefaultInput}
              type="file"
              onChange={handleUploading}
            />
            <label className={styles.fileInput} htmlFor="file-input">
              Upload
            </label>
          </div>
        </ObjectsTable>
      </div>
    </div>
  );
};

export { BSSpace };
