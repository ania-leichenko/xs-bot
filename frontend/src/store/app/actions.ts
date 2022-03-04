import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMTenantByIdRequestParamsDto,
  EAMTenantByIdResponseDto,
  AsyncThunkConfig,
  NotifyActionPayload,
} from 'common/types/types';
import { ActionType } from './common';

const notify = createAsyncThunk<void, NotifyActionPayload, AsyncThunkConfig>(
  ActionType.NOTIFY,
  async (payload, { extra }) => {
    const { notification } = extra;
    const { title, message, type } = payload;

    notification[type](title, message);
  },
);

const getTenant = createAsyncThunk<
  EAMTenantByIdResponseDto,
  EAMTenantByIdRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_TENANT, async (payload, { extra }) => {
  const { tenantApi } = extra;

  const tenant = await tenantApi.getTenant(payload);

  return tenant;
});

export { notify, getTenant };
