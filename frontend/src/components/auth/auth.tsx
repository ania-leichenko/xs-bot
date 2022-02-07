import { FC } from 'react';
import { MasterSignUpRequestDto, MasterSignInDto } from 'common/types/types';
import { auth as authActions } from 'store/actions';
import { AppRoute } from 'common/enums/enums';
import { useLocation, useAppDispatch } from 'hooks/hooks';
import { SignInForm, SignUpForm } from './components/components';

const Auth: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handleSignInSubmit = (payload: MasterSignInDto): void => {
    dispatch(authActions.signIn(payload));
  };

  const handleSignUpSubmit = (payload: MasterSignUpRequestDto): void => {
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
