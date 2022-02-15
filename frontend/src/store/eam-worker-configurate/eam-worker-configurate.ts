import { createReducer } from '@reduxjs/toolkit';
import { workerCreate } from './actions';

type State = {
  groups: [];
};

const initialState: State = {
  groups: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(workerCreate.fulfilled, () => {
    return;
  });
});

export { reducer };
