import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  SCInstanceGetByTenantRequestParamsDto,
  SCInstanceGetByTenantResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const loadInstances = createAsyncThunk<
  SCInstanceGetByTenantResponseDto,
  SCInstanceGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_INSTANCES, async (params, { extra }) => {
  const { scApi } = extra;
  return scApi.loadInstances(params);
});

const deleteInstance = createAsyncThunk<string, string, AsyncThunkConfig>(
  ActionType.DELETE_INSTANCE,
  async (id, { extra }) => {
    const { scApi, notification } = extra;

    await scApi.deleteInstance(id);

    notification.success('Success!', 'Instance has been successfully deleted');

    return id;
  },
);

export { loadInstances, deleteInstance };
