import {
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { InputType } from 'common/enums/enums';
import { ErrorMessage } from 'components/common/common';

type Props = {
  label: string;
  name: FormControlPath;
  control: FormControl;
  errors: FormControlErrors;
  type?: InputType;
  placeholder?: string;
};

const Input: React.FC<Props> = ({
  label,
  name,
  control,
  errors,
  placeholder = '',
  type = InputType.TEXT,
}) => {
  const { field } = useFormControl({ name, control });

  return (
    <label>
      <span>{label}</span>
      <input {...field} type={type} placeholder={placeholder} />
      <span>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export { Input };
