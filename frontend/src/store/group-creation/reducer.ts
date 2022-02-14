import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { create } from './actions';
import { EAMMasterByIdResponseDto } from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  user: EAMMasterByIdResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(create.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
});

export { reducer };
