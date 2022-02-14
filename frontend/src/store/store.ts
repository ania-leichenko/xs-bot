import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import {
  authApi,
  tenantApi,
  navigation,
  storage,
  groupApi,
} from 'services/services';
import { handleError } from './middlewares/middlewares';

const extraArgument = {
  authApi,
  tenantApi,
  navigation,
  storage,
  groupApi,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
      serializableCheck: false,
    }).concat(handleError);
  },
});

export { extraArgument, store };
