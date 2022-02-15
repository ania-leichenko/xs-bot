import { createReducer } from '@reduxjs/toolkit';
import { getWorkers, workerCreate } from './actions';

type State = {
  groups: [];
  workers: [];
};

const initialState: State = {
  groups: [],
  workers: [],
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
