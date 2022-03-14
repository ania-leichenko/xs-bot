import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationTitle, NotificationMessage } from 'common/enums/enums';
import {
  SCInstanceGetByTenantRequestParamsDto,
  SCInstanceGetByTenantResponseDto,
  SCSshKeyGetByIdResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const loadSshKey = createAsyncThunk<
  SCSshKeyGetByIdResponseDto,
  string,
  AsyncThunkConfig
>(ActionType.GET_SSH_KEY, async (id, { extra }) => {
  const { scApi, notification } = extra;
  const sshKey = await scApi.loadSshKey(id);
  notification.success(
    NotificationTitle.SUCCESS,
    NotificationMessage.SC_SSH_KEY_COPY,
  );
  return sshKey;
});

const loadInstances = createAsyncThunk<
  SCInstanceGetByTenantResponseDto,
  SCInstanceGetByTenantRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_INSTANCES, async (params, { extra }) => {
  const { scApi } = extra;
  return scApi.loadInstances(params);
});

const deleteInstance = createAsyncThunk<string, string, AsyncThunkConfig>(
  ActionType.DELETE_INSTANCE,
  async (id, { extra }) => {
    const { scApi, notification } = extra;

    await scApi.deleteInstance(id);

    notification.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.SC_INSTANCE_DELETE,
    );

    return id;
  },
);

const cleanupSshKey = createAction(ActionType.CLEANUP_SSH_KEY);

export { loadInstances, deleteInstance, loadSshKey, cleanupSshKey };
