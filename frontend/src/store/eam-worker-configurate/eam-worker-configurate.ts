import { createReducer } from '@reduxjs/toolkit';
import { EAMCreateWorker } from './actions';

type State = {
  groups: [];
};

const initialState: State = {
  groups: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(EAMCreateWorker.fulfilled, () => {
    return;
  });
});

export { reducer };
