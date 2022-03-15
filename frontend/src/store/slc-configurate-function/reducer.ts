import { DataStatus } from 'common/enums/enums';
import { createReducer } from '@reduxjs/toolkit';
import {
  resetFunction,
  createFunction,
  loadFunction,
  updateFunction,
  runFunction,
} from './actions';
import {
  SLCFunctionLoadResponseDto,
  SLCFunctionRunResponseDto,
} from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  loadFunction: SLCFunctionLoadResponseDto;
  response: SLCFunctionRunResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  loadFunction: {} as SLCFunctionLoadResponseDto,
  response: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(resetFunction.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
  builder.addCase(createFunction.fulfilled, () => {
    return;
  });
  builder.addCase(loadFunction.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadFunction.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.loadFunction = action.payload;
  });
  builder.addCase(loadFunction.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(updateFunction.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(updateFunction.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.loadFunction = { ...state.loadFunction, ...action.payload };
  });
  builder.addCase(updateFunction.rejected, (state) => {
    state.dataStatus = DataStatus.IDLE;
    state.loadFunction = { ...state.loadFunction };
  });
  builder.addCase(runFunction.fulfilled, (state, action) => {
    state.response = action.payload;
  });
});

export { reducer };
