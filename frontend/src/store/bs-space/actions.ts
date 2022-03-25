import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  BSObjectDownloadParamsDto,
  BSObjectGetRequestParamsDto,
  BSObjectGetResponseDto,
} from 'common/types/types';
import { ActionType } from './common';

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
  BSObjectDownloadParamsDto,
  AsyncThunkConfig
>(ActionType.DOWNLOAD_OBJECT, async (params, { extra }) => {
  const { bsApi } = extra;

  return await bsApi.downloadObject(params);
});

const uploadObject = createAsyncThunk<
  boolean,
  { id: string; file: FormData },
  AsyncThunkConfig
>(ActionType.UPLOAD_OBJECT, async (payload, { extra }) => {
  const { bsApi } = extra;

  return bsApi.uploadObject(payload.id, payload.file);
});

export { loadObjects, downloadObject, uploadObject };
