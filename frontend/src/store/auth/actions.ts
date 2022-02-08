import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  MasterSignUpRequestDto,
  MasterSignInDto,
  MasterDto,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const signUp = createAsyncThunk<
  Promise<MasterDto>,
  MasterSignUpRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi } = extra;
  return authApi.signUp(registerPayload);
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
  number,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (id, { extra }) => {
  const { authApi } = extra;
  return await authApi.getCurrentUser(id);
});

export { signUp, signIn, loadCurrentUser };
