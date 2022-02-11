import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMCreateWorkerRequestDto,
  EAMCreateWorkerResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';
import { getRandomId } from 'bws-shared';

const EAMCreateWorker = createAsyncThunk<
  EAMCreateWorkerResponseDto,
  EAMCreateWorkerRequestDto,
  AsyncThunkConfig
>(
  ActionType.CREATE_WORKER,
  async (payload: EAMCreateWorkerRequestDto, { extra }) => {
    const { workerApi } = extra;
    const res: EAMCreateWorkerResponseDto = await workerApi.createWorker({
      ...payload,
      password: getRandomId(),
    });

    return res;
  },
);

export { EAMCreateWorker };
