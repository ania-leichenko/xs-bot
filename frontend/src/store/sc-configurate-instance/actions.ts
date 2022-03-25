import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  NotificationTitle,
  NotificationMessage,
  AppRoute,
} from 'common/enums/enums';
import {
  SCOperationSystemGetAllResponseDto,
  SCInstanceCreateRequestDto,
  SCInstanceCreateResponseDto,
  SCInstanceUpdateParamsDto,
  SCInstanceUpdateRequestDto,
  SCInstanceUpdateResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const loadOperationSystems = createAsyncThunk<
  SCOperationSystemGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.LOAD_OPERATION_SYSTEMS, async (payload, { extra }) => {
  const { scApi } = extra;

  return scApi.loadOperationSystems();
});

const createInstance = createAsyncThunk<
  SCInstanceCreateResponseDto,
  SCInstanceCreateRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE_INSTANCE, async (payload, { extra }) => {
  const { scApi, navigation, notification } = extra;

  const instance = await scApi.createInstance(payload);

  navigation.push(AppRoute.SC);

  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.SC_INSTANCE_CREATE,
  );

  return instance;
});

const updateInstance = createAsyncThunk<
  SCInstanceUpdateResponseDto,
  {
    params: SCInstanceUpdateParamsDto;
    payload: SCInstanceUpdateRequestDto;
  },
  AsyncThunkConfig
>(ActionType.UPDATE_INSTANCE, async ({ params, payload }, { extra }) => {
  const { scApi, navigation, notification } = extra;

  navigation.push(AppRoute.SC);

  const instance = await scApi.updateInstance(params, payload);

  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.SC_INSTANCE_UPDATE,
  );

  return instance;
});

export { loadOperationSystems, createInstance, updateInstance };
