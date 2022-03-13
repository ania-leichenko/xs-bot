import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationTitle, NotificationMessage } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  EAMGroupConfigurateRequestDto,
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
  EAMPermissionGetAllResponseDto,
  EamGroupGetByIdRequestDto,
  EamGroupGetByIdResponseDto,
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
    permissionsIds: registerPayload.permissionsIds,
  };

  const group = await eamApi.createGroup(request);

  navigation.push(AppRoute.EAM);
  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.EAM_GROUP_CREATE,
  );

  return group;
});

const update = createAsyncThunk<
  EAMGroupCreateResponseDto,
  EAMGroupConfigurateRequestDto,
  AsyncThunkConfig
>(ActionType.UPDATE, async (registerPayload, { getState, extra }) => {
  const { eamApi } = extra;

  const { app } = getState();
  const { tenant } = app;

  const request: EAMGroupCreateRequestDto = {
    name: registerPayload.name,
    tenantId: tenant?.id ?? '',
    workersIds: registerPayload.workersIds,
    permissionsIds: registerPayload.permissionsIds,
  };

  const group = await eamApi.updateGroup(registerPayload.id, request);

  return group;
});

const getGroupById = createAsyncThunk<
  EamGroupGetByIdResponseDto,
  EamGroupGetByIdRequestDto,
  AsyncThunkConfig
>(ActionType.GET_GROUP, async (payload, { extra }) => {
  const { eamApi } = extra;
  return await eamApi.getGroupById(payload);
});

const getWorkers = createAsyncThunk<
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_WORKERS, async (payload, { extra }) => {
  const { eamApi } = extra;
  return eamApi.getAllWorkers(payload);
});

const getPermission = createAsyncThunk<
  EAMPermissionGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_PERMISSIONS, async (_payload, { extra }) => {
  const { eamApi } = extra;
  return eamApi.getAllPermission();
});

export { create, update, getWorkers, getPermission, getGroupById };
