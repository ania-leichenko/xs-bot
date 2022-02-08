import { createReducer } from '@reduxjs/toolkit';
import { navigation } from 'services/services';
import { pushHistory } from './actions';

type State = {
  history: string;
};

const initialState: State = {
  history: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(pushHistory, (state, action) => {
    state.history += navigation.push(action.payload);
  });
});
export { reducer };
