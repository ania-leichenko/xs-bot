import { FC } from 'react';
import { AppRoute, ButtonType, InputType, UserRole } from 'common/enums/enums';
import { useAppForm } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { EAMWorkerSignInRequestDto } from 'common/types/types';
import { Button, Input, Link, PasswordInput } from 'components/common/common';
import { DEFAULT_WORKER_LOGIN_PAYLOAD } from './common/constants';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: EAMWorkerSignInRequestDto) => void;
  onChangeForm: (userRole: UserRole) => void;
};

const SignInWorkerForm: FC<Props> = ({ onSubmit, onChangeForm }) => {
  const { control, errors, handleSubmit } =
    useAppForm<EAMWorkerSignInRequestDto>({
      defaultValues: DEFAULT_WORKER_LOGIN_PAYLOAD,
    });

  const handleOnChangeForm = (): void => {
    onChangeForm(UserRole.MASTER);
  };

  return (
    <>
      <h1 className={styles.title}>Sign In as worker</h1>
      <div>
        <button className={styles.button} onClick={handleOnChangeForm}>
          Sign In as master
        </button>
      </div>
      <div className={styles.subtitle}>
        <span>Need to create a new account? </span>
        <Link className={styles.link} to={AppRoute.SIGN_UP}>
          Sign Up
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type={InputType.TEXT}
            label="Tenant name"
            placeholder="Enter your tenant name"
            name={getNameOf<EAMWorkerSignInRequestDto>('tenantName')}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.TEXT}
            label="IAM user name"
            placeholder="Enter your IAM user name"
            name={getNameOf<EAMWorkerSignInRequestDto>('workerName')}
            control={control}
            errors={errors}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            name={getNameOf<EAMWorkerSignInRequestDto>('password')}
            control={control}
            errors={errors}
          />
        </div>
        <Button type={ButtonType.SUBMIT} label="Sign In" />
      </form>
    </>
  );
};

export { SignInWorkerForm };
