import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common';
import {
  AsyncThunkConfig,
  BSSpaceCreateRequestDto,
  BSSpaceCreateResponseDto,
} from 'common/types/types';
import { AppRoute } from '../../common/enums/app/app-route.enum';

const createSpace = createAsyncThunk<
  BSSpaceCreateResponseDto,
  BSSpaceCreateRequestDto,
  AsyncThunkConfig
>(
  ActionType.CREATE_SPACE,
  async (payload: BSSpaceCreateRequestDto, { extra }) => {
    const { bsApi, navigation, notification } = extra;

    const space = await bsApi.createSpace({
      ...payload,
    });

    navigation.push(AppRoute.BS);

    notification.success('Success!', 'Space has been successfully created');

    return space;
  },
);

export { createSpace };
