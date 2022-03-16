import { DataStatus } from 'common/enums/enums';
import {
  loadOperationSystems,
  createInstance,
  updateInstance,
} from './actions';
import { SCOperationSystemGetAllItemResponseDto } from 'common/types/types';
import { createReducer } from '@reduxjs/toolkit';

type State = {
  operationSystemsDataStatus: DataStatus;
  operationSystems: SCOperationSystemGetAllItemResponseDto[];
};

const initialState: State = {
  operationSystemsDataStatus: DataStatus.IDLE,
  operationSystems: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadOperationSystems.pending, (state) => {
    state.operationSystemsDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadOperationSystems.fulfilled, (state, action) => {
    state.operationSystemsDataStatus = DataStatus.FULFILLED;
    state.operationSystems = action.payload.items;
  });
  builder.addCase(loadOperationSystems.rejected, (state) => {
    state.operationSystemsDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(createInstance.fulfilled, () => {
    return;
  });
  builder.addCase(updateInstance.fulfilled, () => {
    return;
  });
});

export { reducer };
