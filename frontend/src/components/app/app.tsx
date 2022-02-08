import { FC } from 'react';
import { Routes, Route, Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { Auth } from 'components/auth/auth';
import { Home } from 'components/auth/components/home';
import { PrivateRoute } from '../auth/hoc/PrivateRoute';

const App: FC = () => {
  return (
    <>
      <ul className="App-navigation-list">
        <li>
          <Link to={AppRoute.ROOT}>Home</Link>
        </li>
      </ul>

      <Routes>
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        <Route
          path={AppRoute.ROOT}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export { App };
