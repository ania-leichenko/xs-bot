import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { getWorkers } from './actions';
import { EAMWorkerGetAllResponseDto } from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  workers: EAMWorkerGetAllResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  workers: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getWorkers.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getWorkers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.workers = action.payload;
  });
  builder.addCase(getWorkers.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
