import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { loadGroups } from './actions';
import { EAMGroupGetByTenantResponseDto } from 'common/types/types';

type State = {
  dataStatus: DataStatus;
  groupsDataStatus: DataStatus;
  groups: EAMGroupGetByTenantResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  groupsDataStatus: DataStatus.IDLE,
  groups: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadGroups.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadGroups.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.groups = action.payload;
  });
  builder.addCase(loadGroups.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
