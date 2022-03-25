import { BSObjectGetResponseItemDto } from 'common/types/types';
import { DataStatus } from 'common/enums/app/data-status.enum';
import { createReducer } from '@reduxjs/toolkit';
import { downloadObject, loadObjects } from './actions';
import { logOut } from 'store/auth/actions';

type State = {
  dataStatus: DataStatus;
  objects: BSObjectGetResponseItemDto[];
  blob: Blob | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  objects: [],
  blob: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadObjects.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadObjects.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.objects = action.payload.items;
  });
  builder.addCase(loadObjects.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(downloadObject.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(downloadObject.fulfilled, (state, action) => {
    state.blob = action.payload;
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(downloadObject.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(logOut.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
});

export { reducer };
