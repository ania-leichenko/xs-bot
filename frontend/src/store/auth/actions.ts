import { createAsyncThunk } from '@reduxjs/toolkit';
import { MasterSignUpDto } from 'bws-shared/dtos/master/master';
import { AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const signUp = createAsyncThunk<
  Promise<void>,
  MasterSignUpDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi } = extra;
  return authApi.signUp(registerPayload);
});

export { signUp };
