import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { authApi, navigation, storage } from 'services/services';
import { handleError } from './middlewares/middlewares';

const extraArgument = {
  authApi,
  navigation,
  storage,
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
