import { BSObjectGetResponseItemDto } from 'common/types/types';
import { DataStatus } from 'common/enums/app/data-status.enum';
import { createReducer } from '@reduxjs/toolkit';
import { downloadObject, loadObjects, uploadObject } from './actions';
import { logOut } from 'store/auth/actions';
import { downloadBlob } from 'helpers/helpers';

type State = {
  dataStatus: DataStatus;
  objects: BSObjectGetResponseItemDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  objects: [],
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
    downloadBlob(action.payload, action.meta.arg.filename);
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(downloadObject.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(uploadObject.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(uploadObject.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(uploadObject.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(logOut.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
});

export { reducer };
