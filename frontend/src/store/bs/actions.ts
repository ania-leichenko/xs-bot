import { createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationTitle, NotificationMessage } from 'common/enums/enums';
import {
  BSSpaceGetRequestParamsDto,
  BSSpaceGetResponseDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const loadSpaces = createAsyncThunk<
  BSSpaceGetResponseDto,
  BSSpaceGetRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_SPACES, async (filter, { extra }) => {
  const { bsApi } = extra;

  return bsApi.loadSpaces(filter);
});

const deleteSpace = createAsyncThunk<string, string, AsyncThunkConfig>(
  ActionType.DELETE_SPACE,
  async (id, { extra }) => {
    const { bsApi, notification } = extra;

    await bsApi.deleteSpace(id);

    notification.success(
      NotificationTitle.SUCCESS,
      NotificationMessage.BS_SPACE_DELETE,
    );

    return id;
  },
);

export { loadSpaces, deleteSpace };
