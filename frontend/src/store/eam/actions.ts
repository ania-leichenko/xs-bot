import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMWorkerGetAllResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
  EAMTenantByIdResponseDto,
  EAMTenantUpdateRequestDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';
import { NotificationTitle, NotificationMessage } from 'common/enums/enums';

const getWorkers = createAsyncThunk<
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_WORKERS, async (payload, { extra }) => {
  const { eamApi } = extra;
  const workers = await eamApi.getAllWorkers(payload);

  return workers;
});

const loadGroups = createAsyncThunk<
  EAMGroupGetByTenantResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.LOAD_GROUPS, async (filter, { extra }) => {
  const { eamApi } = extra;
  return eamApi.loadGroups(filter);
});

const updateTenant = createAsyncThunk<
  EAMTenantByIdResponseDto,
  EAMTenantUpdateRequestDto,
  AsyncThunkConfig
>(ActionType.UPDATE_TENANT_NAME, async (payload, { extra }) => {
  const { tenantApi, notification } = extra;
  const tenant = await tenantApi.updateTenant(payload);
  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.EAM_UPDATE_TENANT_NAME,
  );
  return tenant;
});

export { getWorkers, loadGroups, updateTenant };
