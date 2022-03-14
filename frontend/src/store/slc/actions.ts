import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationTitle, NotificationMessage } from 'common/enums/enums';
import {
  SLCFunctionGetRequestParamsDto,
  SLCFunctionGetResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const loadFunctions = createAsyncThunk<
  SLCFunctionGetResponseDto,
  SLCFunctionGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_FUNCTIONS, async (filter, { extra }) => {
  const { slcApi } = extra;

  return slcApi.loadFunctions(filter);
});

const deleteFunction = createAsyncThunk<string, string, AsyncThunkConfig>(
  ActionType.DELETE_FUNCTION,
  async (id, { extra }) => {
    const { slcApi, notification } = extra;

    await slcApi.deleteFunction(id);

    notification.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.SLC_FUNCTION_DELETE,
    );

    return id;
  },
);

const resetState = createAction(ActionType.RESET_STATE);

export { loadFunctions, deleteFunction, resetState };
