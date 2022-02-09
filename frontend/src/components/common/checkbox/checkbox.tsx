import React from 'react';
import './styles.module.scss';

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
    <div className="container">
      <label>
        <input
          type="checkbox"
          onChange={onChange}
          disabled={isDisabled}
          checked={isChecked}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export { Checkbox };
