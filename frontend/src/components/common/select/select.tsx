import React from 'react';
import ReactSelect, { ActionMeta } from 'react-select';
import { selectStyling } from './selectStyling';
import styles from './styles.module.scss';

type SelectOption = {
  id?: string;
  value: string;
  label: string;
};

type Props = {
  label: string;
  options: SelectOption[];
  onChange?: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
};

const Select: React.FC<Props> = ({ label, options, onChange }) => {
  return (
    <div className={styles.reactSelectContainer}>
      <span>{label}</span>
      <ReactSelect
        styles={selectStyling}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

export { Select };
