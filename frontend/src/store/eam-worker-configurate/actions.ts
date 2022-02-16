import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMWorkerCreateRequestDto,
  EAMWorkerCreateResponseDto,
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

export { workerCreate };
