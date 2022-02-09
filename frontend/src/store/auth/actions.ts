import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  MasterDto,
  MasterSignInDto,
  MasterSignUpRequestDto,
} from 'common/types/types';
import { ActionType } from './common';
import { StorageKeys } from '../../common/enums/app/storage';

const signUp = createAsyncThunk<
  MasterDto,
  MasterSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signUp(registerPayload);
  storage.setItem(StorageKeys.TOKEN, token);
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

const loadCurrentUser = createAsyncThunk<
  Promise<MasterDto>,
  void,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (payload, { extra }) => {
  const { authApi, storage } = extra;
  const token = storage.getItem(StorageKeys.TOKEN);
  return await authApi.getCurrentUser(JSON.stringify(token));
});

export { signUp, signIn, loadCurrentUser };
