import { FC } from 'react';
import ReactSelect, { ActionMeta } from 'react-select';
import { styles as selectStyles } from './styles';
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

const Select: FC<Props> = ({ label, options, onChange }) => {
  return (
    <div className={styles.reactSelectContainer}>
      <span>{label}</span>
      <ReactSelect
        styles={selectStyles}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

export { Select };
