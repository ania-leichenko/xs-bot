import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMWorkerCreateRequestDto,
  EAMWorkerCreateResponseDto,
  AsyncThunkConfig,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
} from 'common/types/types';
import { ActionType } from './common';
import { getRandomId, generateCsv } from 'helpers/helpers';
import { AppRoute } from 'common/enums/enums';

const workerCreate = createAsyncThunk<
  EAMWorkerCreateResponseDto,
  EAMWorkerCreateRequestDto,
  AsyncThunkConfig
>(
  ActionType.CREATE_WORKER,
  async (payload: EAMWorkerCreateRequestDto, { extra }) => {
    const { workerApi, navigation, notification } = extra;

    const password = getRandomId();

    const worker = await workerApi.createWorker({
      ...payload,
      password,
    });

    const content = [
      ['name:', payload.name],
      ['password:', password],
    ];
    generateCsv(content, 'Credentials.csv');
    navigation.push(AppRoute.EAM);

    notification.success('Success!', 'User has been successfully created');

    return worker;
  },
);

const getGroups = createAsyncThunk<
  EAMGroupGetByTenantResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_GROUPS, async (filter, { extra }) => {
  const { eamApi } = extra;
  return eamApi.loadGroups(filter);
});

export { workerCreate, getGroups };
