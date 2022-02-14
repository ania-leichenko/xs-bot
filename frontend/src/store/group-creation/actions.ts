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
>(ActionType.CREATE, async (registerPayload, { getState, extra }) => {
  const { groupApi } = extra;

  const { auth } = getState();
  const tenantId = auth.user?.tenantId;

  const request: EAMGroupCreateRequestDto = {
    name: registerPayload.name,
    tenantId: tenantId ?? '',
  };
  return await groupApi.create(request);
});

export { create };
