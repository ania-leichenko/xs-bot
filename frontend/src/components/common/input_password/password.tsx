import React, { useState } from 'react';
import { Input } from 'components/common/common';
import {
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';
import { InputType } from 'common/enums/enums';
import eye from 'assets/img/eye.svg';

type Props = {
  label: string;
  name: FormControlPath;
  control: FormControl;
  errors: FormControlErrors;
  placeholder?: string;
};

const PasswordInput: React.FC<Props> = ({
  label,
  name,
  control,
  errors,
  placeholder = '',
}) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleShowToggle = (): void => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div>
      <Input
        type={isShowPassword ? InputType.TEXT : InputType.PASSWORD}
        label={label}
        placeholder={placeholder}
        name={name}
        control={control}
        errors={errors}
      />
      <button onClick={handleShowToggle}>
        <img src={eye} alt={'eye'} width="20" />
      </button>
    </div>
  );
};

export { PasswordInput };
