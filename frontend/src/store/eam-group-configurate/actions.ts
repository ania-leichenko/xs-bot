import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMGroupCreateResponseDto,
  EAMGroupConfigurateRequestDto,
  EAMGroupCreateRequestDto,
  AsyncThunkConfig,
  EAMWorkerGetAllResponseDto,
} from 'common/types/types';
import { ActionType } from './common';
import { StorageKey } from 'common/enums/enums';

const create = createAsyncThunk<
  EAMGroupCreateResponseDto,
  EAMGroupConfigurateRequestDto,
  AsyncThunkConfig
>(ActionType.CREATE, async (registerPayload, { getState, extra }) => {
  const { eamApi, storage } = extra;

  const workersIDs = JSON.parse(
    storage.getItem(StorageKey.SELECTED_WORKERS) || '[]',
  );

  const { app } = getState();
  const { tenant } = app;

  const request: EAMGroupCreateRequestDto = {
    name: registerPayload.name,
    tenantId: tenant?.id ?? '',
    workers: workersIDs ?? [],
  };

  /* eslint no-console: ["error", { allow: ["log", "error"] }] */
  console.log(request);
  return eamApi.createGroup(request);
});

const getWorkers = createAsyncThunk<
  EAMWorkerGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_WORKERS, async (_payload, { extra }) => {
  const { workerApi } = extra;
  return workerApi.getAll();
});

export { create, getWorkers };
