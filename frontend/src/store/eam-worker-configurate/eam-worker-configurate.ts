import { createReducer } from '@reduxjs/toolkit';
import { getWorkers, workerCreate } from './actions';
import { EAMWorkerGetAllResponseDto } from 'common/types/types';

type State = {
  groups: [];
  workers: EAMWorkerGetAllResponseDto | null;
};

const initialState: State = {
  groups: [],
  workers: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(workerCreate.fulfilled, () => {
    return;
  });
  builder.addCase(getWorkers.fulfilled, (state, action) => {
    state.workers = action.payload;
  });
});

export { reducer };
