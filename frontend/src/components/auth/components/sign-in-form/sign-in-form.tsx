import { masterSignIn as masterSignInValidationSchema } from 'validation-schemas/validation-schemas';
import { ButtonType, InputType } from 'common/enums/enums';
import { useAppForm } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { MasterSignInDto } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import { DEFAULT_LOGIN_PAYLOAD } from './common/constants';

type Props = {
  onSubmit: (payload: MasterSignInDto) => void;
};

const SignInForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<MasterSignInDto>({
    defaultValues: DEFAULT_LOGIN_PAYLOAD,
    validationSchema: masterSignInValidationSchema,
  });

  return (
    <>
      <h1>Sign ⚛️</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <p> */}
        <Input
          type={InputType.TEXT}
          label="Name"
          placeholder="Enter your name"
          name={getNameOf<MasterSignInDto>('name')}
          control={control}
          errors={errors}
        />

        <Input
          type={InputType.TEXT}
          label="Password"
          placeholder="Enter your password"
          name={getNameOf<MasterSignInDto>('password')}
          control={control}
          errors={errors}
        />
        {/* </p> */}
        <Button type={ButtonType.SUBMIT} label="Sign in" />
      </form>
    </>
  );
};

export { SignInForm };
