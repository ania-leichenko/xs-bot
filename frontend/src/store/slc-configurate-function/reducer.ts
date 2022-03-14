import { DataStatus } from 'common/enums/enums';
import { createReducer } from '@reduxjs/toolkit';
import { createFunction, loadFunction, updateFunction } from './actions';
import { SLCFunctionLoadResponseDto } from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  loadFunction: SLCFunctionLoadResponseDto;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  loadFunction: {} as SLCFunctionLoadResponseDto,
};

const reducer = createReducer(initialState, (builder) => {
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
});

export { reducer };
