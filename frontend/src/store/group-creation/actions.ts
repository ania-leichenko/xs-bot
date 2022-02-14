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

  const tenantId = 'd94b2c68-289d-467c-914f-ababcdc8fcaa';

  const request: EAMGroupCreateRequestDto = {
    name: registerPayload.name,
    tenantId,
  };
  return await groupApi.create(request);
});

export { create };
