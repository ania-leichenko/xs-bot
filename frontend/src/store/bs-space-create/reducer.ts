import { BSSpaceCreateResponseDto } from 'common/types/types';
import { DataStatus } from 'common/enums/enums';
import { createReducer } from '@reduxjs/toolkit';
import { createSpace } from './actions';

type State = {
  dataStatus: DataStatus;
  spaces: BSSpaceCreateResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  spaces: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(createSpace.fulfilled, () => {
    return;
  });
});

export { reducer };
