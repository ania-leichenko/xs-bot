import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  MasterSignUpDto,
  MasterSignInDto,
  Master,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const signUp = createAsyncThunk<
  Promise<Master>,
  MasterSignUpDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi } = extra;
  return authApi.signUp(registerPayload);
});
const signIn = createAsyncThunk<
  Promise<Master>,
  MasterSignInDto,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (registerPayload, { extra }) => {
  const { authApi } = extra;
  return authApi.signIn(registerPayload);
});

export { signUp, signIn };
