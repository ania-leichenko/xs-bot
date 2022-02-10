import { CSSObject } from '@emotion/react';
import { ControlProps, OptionProps, StylesConfig } from 'react-select';

export const selectStyling: StylesConfig = {
  option: (provided: CSSObject, state: OptionProps): CSSObject => {
    return {
      ...provided,
      backgroundColor: state.isSelected ? '#ff9c00' : '',
      '&:hover': {
        backgroundColor: '#ff9c00',
      },
    };
  },
  control: (provided: CSSObject, state: ControlProps): CSSObject => {
    return {
      ...provided,
      minHeight: '45px',
      background: '#393939',
      border:
        state.menuIsOpen || state.hasValue
          ? '2px solid #ff9c00'
          : '2px solid #8F8F8F',
      borderRadius: '50px',
      cursor: 'pointer',
      boxShadow: 'null',
      '&:hover': {
        borderColor: state.isFocused ? '#ff9c00' : '',
      },
    };
  },
  menu: (provided: CSSObject): CSSObject => {
    return {
      ...provided,
      color: '#ffffff',
      background: '#393939',
      cursor: 'pointer',
      '&:hover': {
        color: 'white',
      },
    };
  },
  singleValue: (provided: CSSObject): CSSObject => {
    return {
      ...provided,
      color: '#ffffff',
    };
  },
};
