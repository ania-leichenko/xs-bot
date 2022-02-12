import { FC } from 'react';
import { eamMasterSignUp as masterSignUpValidationSchema } from 'validation-schemas/validation-schemas';
import {
  AppRoute,
  ButtonStyle,
  ButtonType,
  InputType,
} from 'common/enums/enums';
import { useAppForm, useState } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { EAMMasterSignUpRequestDto } from 'common/types/types';
import { Button, Input, Link, PasswordInput } from 'components/common/common';
import { DEFAULT_REGISTER_PAYLOAD } from './common/constants';
import styles from './sign-up-form.module.scss';

type Props = {
  onSubmit: (payload: EAMMasterSignUpRequestDto) => void;
};

const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } =
    useAppForm<EAMMasterSignUpRequestDto>({
      defaultValues: DEFAULT_REGISTER_PAYLOAD,
      validationSchema: masterSignUpValidationSchema,
    });
  const [isClicked, setIsClicked] = useState(false);
  const clickHandler = (): void => {
    setIsClicked(!isClicked);
  };
  return (
    <>
      <h1 className={styles.title}>Sign Up</h1>
      <div className={styles.subtitle}>
        <span>Already have an account? </span>
        <Link to={AppRoute.SIGN_IN}>Sign In</Link>
      </div>
      <form className={styles.signUpForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signUpFormContent}>
          <Input
            type={InputType.TEXT}
            label="Email"
            placeholder="Enter your email"
            name={getNameOf<EAMMasterSignUpRequestDto>('email')}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.TEXT}
            label="Name"
            placeholder="Enter your name"
            name={getNameOf<EAMMasterSignUpRequestDto>('name')}
            control={control}
            errors={errors}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            name={getNameOf<EAMMasterSignUpRequestDto>('password')}
            control={control}
            errors={errors}
          />
        </div>
        <Button
          type={ButtonType.SUBMIT}
          label="Sign Up"
          onClick={clickHandler}
          btnStyle={isClicked ? ButtonStyle.OUTLINED : ButtonStyle.FILLED}
        />
      </form>
    </>
  );
};

export { SignUpForm };
