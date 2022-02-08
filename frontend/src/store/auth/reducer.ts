import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { signUp, signIn, loadCurrentUser } from './actions';

type State = {
  dataStatus: DataStatus;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  user: any; // will be change
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signUp.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(signUp.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(signUp.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addMatcher(
    isAnyOf(signIn.fulfilled, loadCurrentUser.fulfilled),
    (state, payload) => {
      state.user = payload;
    },
  );
});

export { reducer };
