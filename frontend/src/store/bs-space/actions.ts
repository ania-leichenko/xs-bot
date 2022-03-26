import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
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
    params: { id: string };
    filter: BSObjectGetRequestParamsDto;
  },
  AsyncThunkConfig
>(ActionType.GET_OBJECTS, async ({ filter, params }, { extra }) => {
  const { bsApi } = extra;

  return bsApi.loadObjects(filter, params);
});

const downloadObject = createAsyncThunk<
  Blob,
  BSObjectDownloadParamsDto & { filename: string },
  AsyncThunkConfig
>(ActionType.DOWNLOAD_OBJECT, async (params, { extra }) => {
  const { bsApi, notification } = extra;

  const response = await bsApi.downloadObject(params);

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

  const response = bsApi.uploadObject(payload.id, payload.file);

  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.BS_OBJECT_UPLOAD,
  );

  return response;
});

const clearBlob = createAction<void>(ActionType.CLEAR_BLOB);
const clearFormData = createAction<void>(ActionType.CLEAR_FORM_DATA);

export { loadObjects, downloadObject, uploadObject, clearBlob, clearFormData };
