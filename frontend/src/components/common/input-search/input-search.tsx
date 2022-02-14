import { FC } from 'react';
import { Input } from 'components/common/common';
import { FormControl, FormControlErrors } from 'common/types/types';
import { InputType, ButtonType } from 'common/enums/enums';
import styles from './input-search.module.scss';

type Props = {
  control: FormControl;
  errors: FormControlErrors;
  placeholder?: string;
};

const SearchInput: FC<Props> = ({ control, errors, placeholder }) => {
  return (
    <div className={styles.wrapper}>
      <Input
        type={InputType.TEXT}
        label={''}
        placeholder={placeholder}
        name={'search'}
        control={control}
        errors={errors}
      />
      <button className={styles.search} type={ButtonType.BUTTON}>
        <span className="visually-hidden">Search</span>
      </button>
    </div>
  );
};

export { SearchInput };
