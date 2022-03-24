import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  BSObjectGetRequestParamsDto,
  BSObjectGetResponseDto,
} from 'common/types/types';
import { ActionType } from './common';

const loadObjects = createAsyncThunk<
  BSObjectGetResponseDto,
  {
    params: { id: string };
    filter: BSObjectGetRequestParamsDto;
  },
  AsyncThunkConfig
>(ActionType.GET_OBJECTS, async ({ filter, params }, { extra }) => {
  const { bsApi } = extra;

  return bsApi.loadObjects(filter, params);
});

export { loadObjects };
