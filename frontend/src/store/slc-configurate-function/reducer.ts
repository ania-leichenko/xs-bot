import { DataStatus } from 'common/enums/enums';
import { createReducer } from '@reduxjs/toolkit';
import { createFunction } from './actions';

type State = {
  dataStatus: DataStatus;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(createFunction.fulfilled, () => {
    return;
  });
});

export { reducer };
