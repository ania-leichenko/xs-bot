import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMWorkerGetAllResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const getWorkers = createAsyncThunk<
  EAMWorkerGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_WORKERS, async (_payload, { extra }) => {
  const { eamApi } = extra;
  const workers = await eamApi.getAllWorkers();

  return workers;
});

const loadGroups = createAsyncThunk<
  EAMGroupGetByTenantResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.LOAD_GROUPS, async (filter, { extra }) => {
  const { eamApi } = extra;
  return eamApi.loadGroups(filter);
});

export { getWorkers, loadGroups };
