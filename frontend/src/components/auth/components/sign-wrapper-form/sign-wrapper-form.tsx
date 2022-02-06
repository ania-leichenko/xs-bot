import style from './sign-wrapper-form.module.scss';
import { SignInForm } from '../components';
import { MasterSignInDto } from 'common/types/types';
import { auth as authActions } from 'store/actions';
import { useAppDispatch } from 'hooks/hooks';
import Logo from './Logo.svg';
const SignWrapperForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleSignInSubmit = (payload: MasterSignInDto): void => {
    dispatch(authActions.signIn(payload));
  };
  return (
    <>
      <div className={style.wrapper}>
        <img src={Logo} alt="logo" className={style.logo} />
        <SignInForm onSubmit={handleSignInSubmit} />
      </div>
    </>
  );
};
export { SignWrapperForm };
