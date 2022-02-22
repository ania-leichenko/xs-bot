import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  SCOperationSystemGetAllResponseDto,
  SCInstanceCreateRequestDto,
  SCInstanceCreateResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';
import { AppRoute } from 'common/enums/enums';

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

  navigation.push(AppRoute.SC);

  const instance = await scApi.createInstance(payload);

  notification.success('Success!', 'Instance has been successfully created');

  return instance;
});

export { loadOperationSystems, createInstance };