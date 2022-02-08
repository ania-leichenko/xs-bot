import { FC, useEffect } from 'react';
import { useAppDispatch } from 'hooks/hooks';
import { auth as authActions } from 'store/actions';

import { Routes, Route } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { Auth } from 'components/auth/auth';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const userId = Number(localStorage.getItem('userId')); // need change

  useEffect(() => {
    if (userId) {
      dispatch(authActions.loadCurrentUser(userId));
    }
  }, [userId, dispatch]);

  return (
    <>
      <Routes>
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
      </Routes>
    </>
  );
};

export { App };
