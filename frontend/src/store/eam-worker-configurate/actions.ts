import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMWorkerCreateRequestDto,
  EAMWorkerCreateResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';
import { getRandomId } from 'helpers/helpers';

const EamWorkerCreate = createAsyncThunk<
  EAMWorkerCreateResponseDto,
  EAMWorkerCreateRequestDto,
  AsyncThunkConfig
>(
  ActionType.CREATE_WORKER,
  async (payload: EAMWorkerCreateRequestDto, { extra }) => {
    const { workerApi } = extra;
    const worker: EAMWorkerCreateResponseDto = await workerApi.createWorker({
      ...payload,
      password: getRandomId(),
      groupIds: [],
    });
    return worker;
  },
);

export { EamWorkerCreate };
