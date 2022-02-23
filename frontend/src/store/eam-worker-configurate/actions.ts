import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EAMWorkerCreateRequestDto,
  AsyncThunkConfig,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
} from 'common/types/types';
import { ActionType } from './common';
import { getRandomId } from 'helpers/helpers';
import { CSV } from 'common/enums/enums';

const workerCreate = createAsyncThunk<
  File,
  EAMWorkerCreateRequestDto,
  AsyncThunkConfig
>(
  ActionType.CREATE_WORKER,
  async (payload: EAMWorkerCreateRequestDto, { extra }) => {
    const { workerApi, notification, saver } = extra;

    const password = getRandomId();

    await workerApi.createWorker({
      ...payload,
      password,
    });

    const csvFile = saver.saveCSV(
      [
        [CSV.NAME, payload.name],
        [CSV.PASSWORD, password],
      ],
      `${payload.name}-worker-credentials`,
    );

    notification.success('Success!', 'User has been successfully created');

    return csvFile;
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
