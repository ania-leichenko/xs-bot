import { createReducer } from '@reduxjs/toolkit';
import { EamWorkerCreate } from './actions';

type State = {
  groups: [];
};

const initialState: State = {
  groups: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(EamWorkerCreate.fulfilled, () => {
    return;
  });
});

export { reducer };
