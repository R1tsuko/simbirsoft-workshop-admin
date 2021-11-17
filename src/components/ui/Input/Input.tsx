/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './Input.module.scss';

interface IInputProps {
  type: 'text' | 'textbox' | 'password';
  placeholder?: string;
  registerReturn?: UseFormRegisterReturn;
  errorMessage?: string;
  id: string;
  labelText: string;
}

const Input: React.FC<IInputProps> = ({
  placeholder,
  registerReturn,
  type,
  errorMessage,
  id,
  labelText,
}) => (
  <div className={styles.inputContainer}>
    <label className={styles.label} htmlFor={id}>
      {labelText}
    </label>
    <span className={styles.inputErrorMessageWrapper}>
      <span className={styles.errorMessage}>{errorMessage}</span>
    </span>
    <input
      className={styles.input}
      id={id}
      type={type}
      placeholder={placeholder}
      {...registerReturn}
    />
  </div>
);

Input.defaultProps = {
  placeholder: '',
  registerReturn: undefined,
  errorMessage: '',
};

export default Input;
