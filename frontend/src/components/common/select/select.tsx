import React from 'react';
import ReactSelect, { ActionMeta } from 'react-select';
import styles from './styles.module.scss';

type Props = {
  label: string;
  options: [];
  onChange: (newValue: null, actionMeta: ActionMeta<never>) => void;
};

const Select: React.FC<Props> = ({ label, options, onChange }) => {
  return (
    <div className={styles.reactSelectContainer}>
      <span>{label}</span>
      <ReactSelect
        // styles={{
        //   option: (provided, state) => ({
        //     ...provided,
        //     backgroundColor:  state.isSelected ? '#ff9c00' : '',
        //     '&:hover': {
        //       backgroundColor: '#ff9c00',
        //     },
        //   }),
        //   control: (provided, state) => ({
        //     ...provided,
        //     minHeight: '45px',
        //     background: '#393939',
        //     border:  state.menuIsOpen || state.hasValue ? '2px solid #ff9c00' : '2px solid #8F8F8F',
        //     borderRadius: '50px',
        //     cursor: 'pointer',
        //     boxShadow: 'null',
        //     '&:hover': {
        //       borderColor: state.isFocused ? '#ff9c00' : '',
        //     },
        //   }),
        //   menu: (provided) => ({
        //     ...provided,
        //     color: '#ffffff',
        //     background: '#393939',
        //     cursor: 'pointer',
        //     '&:hover': {
        //       color: 'white',
        //     },
        //   }),
        //   singleValue: (provided) => ({ ...provided, color: '#ffffff' }),
        // }}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

export { Select };
