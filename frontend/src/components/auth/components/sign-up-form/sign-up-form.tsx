import { masterSignUp as masterSignUpValidationSchema } from 'validation-schemas/validation-schemas';
import logo from 'assets/img/logo.svg';
import { AppRoute, ButtonType, InputType } from 'common/enums/enums';
import { useAppForm } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { MasterSignUpDto } from 'common/types/types';
import { Button, Input, Link } from 'components/common/common';
import { DEFAULT_REGISTER_PAYLOAD } from './common/constants';
import styles from './sign-up-form.module.scss';

type Props = {
  onSubmit: (payload: MasterSignUpDto) => void;
};

const SignUpForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<MasterSignUpDto>({
    defaultValues: DEFAULT_REGISTER_PAYLOAD,
    validationSchema: masterSignUpValidationSchema,
  });

  return (
    <>
      <img className={styles.signUpLogo} src={logo} alt="logo" />
      <h1 className={styles.signUpTitle}>Sign Up</h1>
      <div className={styles.signInLink}>
        <span>Already have an account? </span>
        <Link to={AppRoute.SIGN_IN}>Sign in</Link>
      </div>
      <form className={styles.signUpForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signUpFormContent}>
          <Input
            type={InputType.TEXT}
            label="Email"
            placeholder="Enter your email"
            name={getNameOf<MasterSignUpDto>('email')}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.TEXT}
            label="Name"
            placeholder="Enter your name"
            name={getNameOf<MasterSignUpDto>('name')}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.TEXT}
            label="Password"
            placeholder="Enter your password"
            name={getNameOf<MasterSignUpDto>('password')}
            control={control}
            errors={errors}
          />
        </div>
        <Button type={ButtonType.SUBMIT} label="Sign up" />
      </form>
    </>
  );
};

export { SignUpForm };
