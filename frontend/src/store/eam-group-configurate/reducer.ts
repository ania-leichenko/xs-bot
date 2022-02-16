import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { create, getWorkers } from './actions';
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
  builder.addCase(create.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(getWorkers.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.workers = action.payload.items;
  });
});

export { reducer };
