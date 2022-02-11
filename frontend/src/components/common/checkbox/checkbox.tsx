import React from 'react';
import style from './styles.module.scss';

type Props = {
  label: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Checkbox: React.FC<Props> = ({
  label,
  onChange,
  isChecked = false,
  isDisabled = false,
}) => {
  return (
    <label className={style.label}>
      <input
        className={style.checkbox}
        type="checkbox"
        onChange={onChange}
        disabled={isDisabled}
        checked={isChecked}
      />
      <span className={style.span}>{label}</span>
    </label>
  );
};

export { Checkbox };
