import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMTenantByIdRequestParamsDto,
  EAMTenantByIdResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const getTenant = createAsyncThunk<
  EAMTenantByIdResponseDto,
  EAMTenantByIdRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_TENANT, async (payload, { extra }) => {
  const { tenantApi } = extra;

  const tenant = await tenantApi.getTenant(payload);

  return tenant;
});

export { getTenant };
