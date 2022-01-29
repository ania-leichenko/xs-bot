import { FC } from 'react';
import { MasterSignUpDto } from 'bws-shared/dtos/master/master';
import { auth as authActions } from 'store/actions';
import { AppRoute } from 'common/enums/enums';
import { useLocation, useAppDispatch } from 'hooks/hooks';
import { SignInForm, SignUpForm } from './components/components';

const Auth: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handleSignInSubmit = (): void => {
    // handle sign in
  };

  const handleSignUpSubmit = (payload: MasterSignUpDto): void => {
    dispatch(authActions.signUp(payload));
  };

  const getScreen = (screen: string): React.ReactElement | null => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
    }

    return null;
  };

  return <>{getScreen(pathname)}</>;
};

export { Auth };
