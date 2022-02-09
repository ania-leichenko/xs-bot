import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  MasterDto,
  MasterSignInDto,
  MasterSignUpRequestDto,
} from 'common/types/types';
import { ActionType } from './common';
import { StorageKey } from '../../common/enums/app/storage-key';

const signUp = createAsyncThunk<
  MasterDto,
  MasterSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signUp(registerPayload);
  storage.setItem(StorageKey.TOKEN, token);
  return user;
});

const signIn = createAsyncThunk<
  Promise<MasterDto>,
  MasterSignInDto,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (registerPayload, { extra }) => {
  const { authApi } = extra;
  return authApi.signIn(registerPayload);
});

const loadCurrentUser = createAsyncThunk<MasterDto, void, AsyncThunkConfig>(
  ActionType.SIGN_IN,
  async (payload, { extra }) => {
    const { authApi } = extra;
    const { user } = await authApi.getCurrentUser();
    return user;
  },
);

export { signUp, signIn, loadCurrentUser };
