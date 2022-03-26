import { BSObjectGetResponseItemDto } from 'common/types/types';
import { DataStatus } from 'common/enums/app/data-status.enum';
import { createReducer } from '@reduxjs/toolkit';
import {
  clearBlob,
  downloadObject,
  loadObjects,
  clearFormData,
} from './actions';
import { logOut } from 'store/auth/actions';

type State = {
  dataStatus: DataStatus;
  objects: BSObjectGetResponseItemDto[];
  formData: FormData;
  blob: Blob | null;
  filename: string;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  objects: [],
  formData: new FormData(),
  blob: null,
  filename: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(clearBlob, (state) => {
    state.blob = null;
    state.filename = '';
  });
  builder.addCase(clearFormData, (state) => {
    state.formData = new FormData();
  });
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
    state.filename = action.meta.arg.filename;
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
