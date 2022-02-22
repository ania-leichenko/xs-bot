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

export { loadInstances };
