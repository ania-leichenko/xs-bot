import { createAsyncThunk } from '@reduxjs/toolkit';
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

export { loadFunctions };
