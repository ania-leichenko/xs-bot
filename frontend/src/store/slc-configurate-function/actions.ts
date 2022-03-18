import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  NotificationTitle,
  NotificationMessage,
  AppRoute,
} from 'common/enums/enums';
import {
  AsyncThunkConfig,
  SLCFunctionCreateRequestDto,
  SLCFunctionCreateResponseDto,
  SLCFunctionLoadParamsDto,
  SLCFunctionLoadResponseDto,
  SLCFunctionUpdateParamsDto,
  SLCFunctionUpdateRequestDto,
  SLCFunctionUpdateResponseDto,
  SLCFunctionRunParamsDto,
  SLCFunctionRunResponseDto,
} from 'common/types/types';
import { ActionType } from './common';

const resetFunction = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.RESET_FUNCTION,
  async (_payload, { extra }) => {
    const { navigation } = extra;

    navigation.push(AppRoute.SLC);
  },
);

const createFunction = createAsyncThunk<
  SLCFunctionCreateResponseDto,
  SLCFunctionCreateRequestDto,
  AsyncThunkConfig
>(
  ActionType.CREATE_FUNCTION,
  async (payload: SLCFunctionCreateRequestDto, { extra }) => {
    const { slcApi, navigation, notification } = extra;

    const slcFunction = await slcApi.createFunction(payload);

    navigation.push(AppRoute.SLC);

    notification.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.SLC_FUNCTION_CREATE,
    );

    return slcFunction;
  },
);

const loadFunction = createAsyncThunk<
  SLCFunctionLoadResponseDto,
  SLCFunctionLoadParamsDto,
  AsyncThunkConfig
>(
  ActionType.LOAD_FUNCTION,
  async (params: SLCFunctionLoadParamsDto, { extra }) => {
    const { slcApi } = extra;

    const loadFunction = await slcApi.loadFunction(params);

    return loadFunction;
  },
);

const updateFunction = createAsyncThunk<
  SLCFunctionUpdateResponseDto,
  { params: SLCFunctionUpdateParamsDto; payload: SLCFunctionUpdateRequestDto },
  AsyncThunkConfig
>(ActionType.UPDATE_FUNCTION, async ({ params, payload }, { extra }) => {
  const { slcApi } = extra;

  const updateFunction = await slcApi.updateFunction(params, payload);

  return updateFunction;
});

const runFunction = createAsyncThunk<
  SLCFunctionRunResponseDto,
  SLCFunctionRunParamsDto,
  AsyncThunkConfig
>(ActionType.RUN_FUNCTION, async (params, { extra }) => {
  const { slcApi } = extra;

  const response = await slcApi.runFunction(params);

  return response;
});

export {
  resetFunction,
  createFunction,
  loadFunction,
  updateFunction,
  runFunction,
};
