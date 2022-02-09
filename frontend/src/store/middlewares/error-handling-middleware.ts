import { Middleware } from '@reduxjs/toolkit';
import { notifications } from '../../services/services';

const errorHandlingMiddleware: Middleware =
  () =>
  (next) =>
  (action): void => {
    if (action.error) {
      const { name, message } = action.error;
      notifications.error(name, message);
    }

    return next(action);
  };

export { errorHandlingMiddleware };
