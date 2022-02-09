import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { authApi } from 'services/services';
import { errorHandlingMiddleware } from './middlewares/error-handling-middleware';

const extraArgument = {
  authApi,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
      serializableCheck: false,
    }).prepend(errorHandlingMiddleware);
  },
});

export { extraArgument, store };
