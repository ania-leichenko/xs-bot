import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  BSObjectDownloadParamsDto,
  BSObjectGetRequestParamsDto,
  BSObjectGetResponseDto,
} from 'common/types/types';
import { ActionType } from './common';
import { NotificationMessage, NotificationTitle } from 'common/enums/enums';

const loadObjects = createAsyncThunk<
  BSObjectGetResponseDto,
  {
    id: string;
    filter: BSObjectGetRequestParamsDto;
  },
  AsyncThunkConfig
>(ActionType.GET_OBJECTS, async ({ filter, id }, { extra }) => {
  const { bsApi } = extra;

  return bsApi.loadObjects(filter, id);
});

const downloadObject = createAsyncThunk<
  Blob,
  BSObjectDownloadParamsDto & { filename: string },
  AsyncThunkConfig
>(ActionType.DOWNLOAD_OBJECT, async (params, { extra }) => {
  const { bsApi, notification } = extra;

  const saveBlob = (blob: Blob, filename: string): void => {
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

  const response = await bsApi.downloadObject(params);

  (): void => saveBlob(response, params.filename);

  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.BS_OBJECT_DOWNLOAD,
  );

  return response;
});

const uploadObject = createAsyncThunk<
  boolean,
  { id: string; file: FormData },
  AsyncThunkConfig
>(ActionType.UPLOAD_OBJECT, async (payload, { extra }) => {
  const { bsApi, notification } = extra;

  const response = await bsApi.uploadObject(payload.id, payload.file);

  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.BS_OBJECT_UPLOAD,
  );

  return response;
});

export { loadObjects, downloadObject, uploadObject };
