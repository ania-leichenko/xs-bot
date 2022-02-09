import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMCreateWorkerRequestDto,
  EAMCreateWorkerResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const EAMCreateWorker = createAsyncThunk<
  EAMCreateWorkerResponseDto,
  EAMCreateWorkerRequestDto,
  AsyncThunkConfig
>(
  ActionType.CREATE_WORKER,
  async (payload: EAMCreateWorkerRequestDto, { extra }) => {
    const { workerApi } = extra;

    const symbols =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+=';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }

    const res: EAMCreateWorkerResponseDto = await workerApi.createWorker({
      ...payload,
      password,
    });

    return res;
  },
);

export { EAMCreateWorker };
