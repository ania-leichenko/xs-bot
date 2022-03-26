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
  const dispatch = useAppDispatch();
  const blob = useAppSelector(({ BSSpace }) => BSSpace.blob);
  const formData = useAppSelector(({ BSSpace }) => BSSpace.formData);
  const filename = useAppSelector(({ BSSpace }) => BSSpace.filename);

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

  useEffect(() => {
    if (blob) {
      download(blob, filename);
      dispatch(BSSpaceActions.clearBlob());
    }
  }, [blob]);

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

  const handleObjectDownload = (objectId: string, filename: string): void => {
    dispatch(
      BSSpaceActions.downloadObject({
        filename,
        spaceId: id as string,
        objectId,
      }),
    );
  };

  const download = (blob: Blob, filename: string): void => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleUploading = (e: React.FormEvent<HTMLInputElement>): void => {
    const files = e.currentTarget.files;
    if (files) {
      formData.append('file', files[0]);
    }
    dispatch(BSSpaceActions.uploadObject({ id: id as string, file: formData }));
    dispatch(BSSpaceActions.clearFormData());
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
