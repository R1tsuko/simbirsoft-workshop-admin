/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ISearchItem } from '../../../utils/types/commonTypes';
import styles from './Select.module.scss';

interface ISelectProps {
  options: Array<ISearchItem>;
  name: string;
  labelText?: string;
  registerReturn?: UseFormRegisterReturn;
}

const Select: React.FC<ISelectProps> = ({ options, name, labelText, registerReturn }) => (
  <div className={styles.selectContainer}>
    {labelText && (
      <label className={styles.label} htmlFor={name}>
        {labelText}
      </label>
    )}
    <select className={styles.select} name={name} id={name} {...registerReturn}>
      {options.map((option) => (
        <option value={option.id} key={option.value}>
          {option.value}
        </option>
      ))}
    </select>

    <svg
      className={styles.arrows}
      width='6'
      height='7'
      viewBox='0 0 6 7'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.910156 4.66016H5.08984L3 6.75L0.910156 4.66016Z'
        fill='black'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.910156 2.83984L3 0.75L5.08984 2.83984H0.910156Z'
        fill='black'
      />
    </svg>
  </div>
);

Select.defaultProps = {
  labelText: '',
};

export default Select;
