import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMWorkerConfigurateRequestDto,
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
  EAMWorkerConfigurateRequestDto,
  AsyncThunkConfig
>(
  ActionType.CREATE_WORKER,
  async (payload: EAMWorkerConfigurateRequestDto, { extra }) => {
    const { workerApi, navigation, notification } = extra;

    const worker = await workerApi.createWorker({
      ...payload,
      password: getRandomId(),
    });

    navigation.push(AppRoute.EAM);

    notification.success('Success!', 'User has been successfully created');

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
