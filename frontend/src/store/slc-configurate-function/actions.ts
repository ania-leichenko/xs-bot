import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppRoute } from 'common/enums/enums';
import {
  AsyncThunkConfig,
  SLCFunctionCreateRequestDto,
  SLCFunctionCreateResponseDto,
} from 'common/types/types';
import { ActionType } from './common';

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

    notification.success('Success!', 'Function has been successfully created');

    return slcFunction;
  },
);

export { createFunction };
