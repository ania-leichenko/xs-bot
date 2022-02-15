import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMWorkerCreateRequestDto,
  EAMWorkerCreateResponseDto,
  EAMWorkerGetAllResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';
import { getRandomId } from 'helpers/helpers';
import { AppRoute } from 'common/enums/enums';

const workerCreate = createAsyncThunk<
  EAMWorkerCreateResponseDto,
  EAMWorkerCreateRequestDto,
  AsyncThunkConfig
>(
  ActionType.CREATE_WORKER,
  async (payload: EAMWorkerCreateRequestDto, { extra }) => {
    const { workerApi, navigation, notification } = extra;

    const worker = await workerApi.createWorker({
      ...payload,
      password: getRandomId(),
      groupIds: [],
    });

    navigation.push(AppRoute.EAM);

    notification.success('Success!', 'User has been successfully created');

    return worker;
  },
);

const getWorkers = createAsyncThunk<
  EAMWorkerGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_WORKERS, async (_payload, { extra }) => {
  const { workerApi } = extra;
  return await workerApi.getAll();
});

export { workerCreate, getWorkers };
