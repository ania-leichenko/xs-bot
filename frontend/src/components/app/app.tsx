import { FC } from 'react';
import { Routes, Route } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { Auth } from 'components/auth/auth';
import { Toaster } from 'components/common/common';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
      </Routes>
      <Toaster />
    </>
  );
};

export { App };
