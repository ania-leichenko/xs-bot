import { FC } from 'react';
import logo from 'assets/img/logo.svg';
import { Link, Routes, Route } from 'components/common/common';
import { useLocation } from 'hooks/hooks';
import { AppRoute } from 'common/enums/enums';
import { Auth } from 'components/auth/auth';
const App: FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <img src={logo} className="App-logo" width="30" alt="logo" />

      <ul className="App-navigation-list">
        <li>
          <Link to={AppRoute.ROOT}>Root</Link>
        </li>
        <li>
          <Link to={AppRoute.SIGN_IN}>Sign in</Link>
        </li>
        <li>
          <Link to={AppRoute.SIGN_UP}>Sign up</Link>
        </li>
      </ul>
      <p>Current path: {pathname}</p>

      <div>
        <Routes>
          <Route path={AppRoute.SIGN_IN} element={<Auth />} />
          <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        </Routes>
      </div>
    </>
  );
};

export { App };
