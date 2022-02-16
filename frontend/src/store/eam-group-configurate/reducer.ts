import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { create } from './actions';
import { getWorkers } from './actions';
import { EAMWorkerGetAllResponseDto } from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  workers: EAMWorkerGetAllResponseDto;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  workers: { items: [{ id: '', tenantId: '', name: '' }] },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(create.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(getWorkers.fulfilled, (state, action) => {
    state.workers = action.payload;
  });
});

export { reducer };
