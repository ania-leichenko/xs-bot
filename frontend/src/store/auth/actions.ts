import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  MasterSignUpRequestDto,
  MasterSignInRequestDto,
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
  MasterSignInRequestDto,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (registerPayload, { extra }) => {
  const { authApi } = extra;
  return authApi.signIn(registerPayload);
});

export { signUp, signIn };
