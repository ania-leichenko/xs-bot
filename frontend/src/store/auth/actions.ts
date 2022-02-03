import { createAsyncThunk } from '@reduxjs/toolkit';
import { MasterSignUpDto, Master, AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const signUp = createAsyncThunk<
  Promise<Master>,
  MasterSignUpDto,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi } = extra;
  return authApi.signUp(registerPayload);
});

export { signUp };
