import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  BSObjectDownloadParamsDto,
  BSObjectGetRequestParamsDto,
  BSObjectGetResponseDto,
} from 'common/types/types';
import { ActionType } from './common';
import {
  FormDataCommonKey,
  NotificationMessage,
  NotificationTitle,
} from 'common/enums/enums';
import { store } from 'store/store';

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
  BSObjectDownloadParamsDto,
  BSObjectDownloadParamsDto,
  AsyncThunkConfig
>(ActionType.DOWNLOAD_OBJECT, async (params, { extra }) => {
  const { bsApi, notification, saver } = extra;

  const { objects } = store.getState().BSSpace;

  const object = objects.filter((obj) => obj.id === params.objectId);
  const filename = object[0].name;

  const response = await bsApi.downloadObject(params);

  saver.saveBlob(response, filename);

  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.BS_OBJECT_DOWNLOAD,
  );

  return params;
});

const uploadObject = createAsyncThunk<
  boolean,
  { id: string; file: File },
  AsyncThunkConfig
>(ActionType.UPLOAD_OBJECT, async (payload, { extra }) => {
  const { bsApi, notification } = extra;

  const formData = new FormData();
  formData.append(FormDataCommonKey.FILE, payload.file as File);

  const response = await bsApi.uploadObject(payload.id, formData);

  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.BS_OBJECT_UPLOAD,
  );

  return response;
});

export { loadObjects, downloadObject, uploadObject };
