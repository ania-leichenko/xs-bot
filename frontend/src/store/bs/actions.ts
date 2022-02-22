import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  BSSpaceDeleteParamsDto,
  BSSpaceGetRequestParamsDto,
  BSSpaceGetResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';
import { notification } from 'services/services';

const loadSpaces = createAsyncThunk<
  BSSpaceGetResponseDto,
  BSSpaceGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_SPACES, async (filter, { extra }) => {
  const { bsApi } = extra;

  return bsApi.loadSpaces(filter);
});

const deleteSpace = createAsyncThunk<
  BSSpaceDeleteParamsDto,
  BSSpaceDeleteParamsDto,
  AsyncThunkConfig
>(ActionType.DELETE_SPACE, async (payload, { extra }) => {
  const { bsApi } = extra;

  const deleted = await bsApi.deleteSpace(payload);

  notification.success('Success!', 'Space has been successfully deleted');

  return deleted;
});

export { loadSpaces, deleteSpace };
