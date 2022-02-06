import style from './sign-wrapper-form.module.scss';
import { SignInForm } from '../components';
import { MasterSignInDto } from 'common/types/types';
import Logo from './Logo.svg';
const SignWrapperForm: React.FC = () => {
  const onSubmit: any = (data: MasterSignInDto) => {
    return data;
  };
  return (
    <>
      <div className={style.wrapper}>
        <img src={Logo} alt="logo" className={style.logo} />
        <SignInForm onSubmit={onSubmit} />
      </div>
    </>
  );
};
export { SignWrapperForm };
