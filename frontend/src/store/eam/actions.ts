import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMWorkerGetAllResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const getWorkers = createAsyncThunk<
  EAMWorkerGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_WORKERS, async (_payload, { extra }) => {
  const { workerApi } = extra;
  const workers = await workerApi.getAllWorkers();

  return workers;
});

export { getWorkers };
