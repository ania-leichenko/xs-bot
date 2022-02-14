import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMGroupCreateResponseDto,
  EAMGroupCreateRequestDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const create = createAsyncThunk<
  EAMGroupCreateResponseDto,
  EAMGroupCreateRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE, async (registerPayload, { extra }) => {
  const { groupApi } = extra;
  return await groupApi.create(registerPayload);
});

export { create };
