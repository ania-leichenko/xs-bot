import { createReducer } from '@reduxjs/toolkit';
import { MasterDto } from 'bws-shared';
import { DataStatus } from 'common/enums/enums';
import { signUp } from './actions';

type State = {
  dataStatus: DataStatus;
  user: MasterDto;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: { email: '', id: '' },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signUp.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(signUp.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(signUp.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
