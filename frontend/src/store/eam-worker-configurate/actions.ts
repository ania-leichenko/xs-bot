import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationTitle, NotificationMessage } from 'common/enums/enums';
import {
  EAMWorkerCreateRequestDto,
  EAMWorkerCreateResponseDto,
  AsyncThunkConfig,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
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
    });

    navigation.push(AppRoute.EAM);

    notification.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.EAM_WORKER_CREATE,
    );

    return worker;
  },
);

const getGroups = createAsyncThunk<
  EAMGroupGetByTenantResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_GROUPS, async (filter, { extra }) => {
  const { eamApi } = extra;
  return eamApi.loadGroups(filter);
});

export { workerCreate, getGroups };
