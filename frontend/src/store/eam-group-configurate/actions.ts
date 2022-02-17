import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  EAMGroupConfigurateRequestDto,
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
} from 'common/types/types';
import { ActionType } from './common';

const create = createAsyncThunk<
  EAMGroupCreateResponseDto,
  EAMGroupConfigurateRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE, async (registerPayload, { getState, extra }) => {
  const { eamApi } = extra;

  const { app } = getState();
  const { tenant } = app;

  const request: EAMGroupCreateRequestDto = {
    name: registerPayload.name,
    tenantId: tenant?.id ?? '',
    workersIds: registerPayload.workersIds,
  };

  return eamApi.createGroup(request);
});

const getWorkers = createAsyncThunk<
  EAMWorkerGetAllResponseDto,
  EAMWorkerGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_WORKERS, async (payload, { extra }) => {
  const { eamApi } = extra;
  return eamApi.getAllWorkers(payload);
});

export { create, getWorkers };
