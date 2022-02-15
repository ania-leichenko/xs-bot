import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMGroupCreateResponseDto,
  EAMGroupCreateRequestDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';
import { StorageKey } from 'common/enums/enums';

const create = createAsyncThunk<
  EAMGroupCreateResponseDto,
  EAMGroupCreateRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE, async (registerPayload, { getState, extra }) => {
  const { groupApi, storage } = extra;

  const workers = JSON.parse(
    storage.getItem(StorageKey.SELECTED_WORKERS) || '[]',
  );

  const { app } = getState();
  const { tenant } = app;

  const request: EAMGroupCreateRequestDto = {
    name: registerPayload.name,
    tenantId: tenant?.id ?? '',
    workers: workers,
  };
  return await groupApi.create(request);
});

export { create };
