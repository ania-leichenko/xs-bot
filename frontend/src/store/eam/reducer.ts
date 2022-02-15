import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { getWorkers } from './actions';
import { EAMWorkerGetAllItemResponseDto } from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  workers: EAMWorkerGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  workers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getWorkers.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getWorkers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.workers = action.payload.items;
  });
  builder.addCase(getWorkers.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
