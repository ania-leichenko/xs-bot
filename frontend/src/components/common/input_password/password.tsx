import React, { useState } from 'react';
import { Input } from 'components/common/common';
import {
  FormControl,
  FormControlErrors,
  MasterSignUpDto,
} from 'common/types/types';
import { InputType } from 'common/enums/enums';
import { getNameOf } from 'helpers/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

type Props = {
  control: FormControl;
  errors: FormControlErrors;
};

const Password: React.FC<Props> = ({ control, errors }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Input
        type={show ? InputType.TEXT : InputType.PASSWORD}
        label={'Password'}
        placeholder={'Enter your password'}
        name={getNameOf<MasterSignUpDto>('password')}
        control={control}
        errors={errors}
      />
      <button
        onClick={(): void => {
          setShow(!show);
        }}
      >
        {show ? (
          <FontAwesomeIcon icon={faEyeSlash} />
        ) : (
          <FontAwesomeIcon icon={faEye} />
        )}
      </button>
    </div>
  );
};

export { Password };
