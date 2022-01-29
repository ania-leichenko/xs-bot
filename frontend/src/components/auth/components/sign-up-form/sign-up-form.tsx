import { MasterSignUpDto } from 'bws-shared/dtos/master/master';
import { nameof } from 'bws-shared/helpers/typescript/typescript';
import { masterSignUpValidationSchema } from 'validation-schemas/validation-schemas';
import { ButtonType, InputType } from 'common/enums/enums';
import { useAppForm } from 'hooks/hooks';
import { Button, Input } from 'components/common/common';
import { DEFAULT_REGISTER_PAYLOAD } from './common/constants';

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
      <h1>Sign Up ⚛️</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <Input
            type={InputType.TEXT}
            label="Email"
            placeholder="Enter your email"
            name={nameof<MasterSignUpDto>('email')}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.TEXT}
            label="Name"
            placeholder="Enter your name"
            name={nameof<MasterSignUpDto>('name')}
            control={control}
            errors={errors}
          />
          <Input
            type={InputType.TEXT}
            label="Password"
            placeholder="Enter your password"
            name={nameof<MasterSignUpDto>('password')}
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
