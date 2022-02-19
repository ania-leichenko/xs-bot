import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  EAMGroupConfigurateRequestDto,
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
} from 'common/types/types';
import { ActionType } from './common';
import { AppRoute } from '../../common/enums/app/app-route.enum';

const create = createAsyncThunk<
  EAMGroupCreateResponseDto,
  EAMGroupConfigurateRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE, async (registerPayload, { getState, extra }) => {
  const { eamApi, navigation, notification } = extra;

  const { app } = getState();
  const { tenant } = app;

  const request: EAMGroupCreateRequestDto = {
    name: registerPayload.name,
    tenantId: tenant?.id ?? '',
    workersIds: registerPayload.workersIds,
    permissionIds: [], // will be fix on frontend branch
  };

  const group = await eamApi.createGroup(request);

  navigation.push(AppRoute.EAM);
  notification.success('Success!', 'Group has been successfully created');

  return group;
});

const getWorkers = createAsyncThunk<
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_WORKERS, async (payload, { extra }) => {
  const { eamApi } = extra;
  return eamApi.getAllWorkers(payload);
});

export { create, getWorkers };
