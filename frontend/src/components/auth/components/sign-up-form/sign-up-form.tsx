import { UserCreatePayload } from 'common/types/types';
import { userSignUp as userSignUpValidationSchema } from 'validation-schemas/validation-schemas';
import { ButtonType, InputType, UserPayloadKey } from 'common/enums/enums';
import { useAppForm } from 'hooks/hooks';
import { Button, Input } from 'components/common/common';
import { DEFAULT_REGISTER_PAYLOAD } from './common/constants';

type Props = {
  onSubmit: (payload: UserCreatePayload) => void;
};

const SignUpForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<UserCreatePayload>({
    defaultValues: DEFAULT_REGISTER_PAYLOAD,
    validationSchema: userSignUpValidationSchema,
  });

  return (
    <>
      <h1>Sign Up ⚛️</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <Input
            type={InputType.TEXT}
            label="Email"
            placeholder="Enter your email"
            name={UserPayloadKey.EMAIL}
            control={control}
            errors={errors}
          />
        </p>
        <Button type={ButtonType.SUBMIT} label="Sign up" />
      </form>
    </>
  );
};

export { SignUpForm };
