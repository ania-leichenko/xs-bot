import style from './sign-wrapper-form.module.scss';
import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/enums';
import { SignInForm } from '../components';
import { MasterSignInDto } from 'common/types/types';
const SignWrapperForm: React.FC = () => {
  const onSubmit: any = (data: MasterSignInDto) => {
    return data;
  };

  return (
    <>
      <div>
        <div className={style.logo}>Logo</div>
        <div className={style.title}>Title</div>
        <div className={style.subtitle}>SubTitle</div>
        <span>Need to create a new account</span>
        <span className={style.link}>
          <Link children="SignUp" to={AppRoute.SIGN_UP}></Link>
        </span>
        <div>
          <SignInForm onSubmit={onSubmit} />
        </div>
        <span>By using SWS you are agreeing to urr privacy policy</span>
      </div>
    </>
  );
};
export { SignWrapperForm };
