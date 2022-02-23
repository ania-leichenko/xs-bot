import { createReducer } from '@reduxjs/toolkit';
import { workerCreate, getGroups } from './actions';
import { DataStatus } from 'common/enums/enums';
import { EAMGroupGetByTenantResponseItemDto } from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  groups: EAMGroupGetByTenantResponseItemDto[];
  csvFile: File | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  groups: [],
  csvFile: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(workerCreate.fulfilled, (state, action) => {
    state.csvFile = action.payload;
  });

  builder.addCase(getGroups.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.groups = action.payload.items;
  });
});

export { reducer };
