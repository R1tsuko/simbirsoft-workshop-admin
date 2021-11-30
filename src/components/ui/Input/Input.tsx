/* eslint-disable react/jsx-props-no-spreading */
import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface IInputProps {
  type: 'text' | 'textbox' | 'password';
  placeholder?: string;
  blackText?: boolean;
  errorMessage?: string;
  labelText: string;
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      placeholder,
      type,
      errorMessage,
      labelText,
      blackText,
      name,
      onChange,
      onBlur,
    }: IInputProps,
    ref
  ) => (
    <div
      className={classNames(styles.inputContainer, {
        [styles.black]: blackText,
      })}
    >
      <label className={styles.label} htmlFor={name}>
        {labelText}
      </label>
      <span className={styles.inputErrorMessageWrapper}>
        <span className={styles.errorMessage}>{errorMessage}</span>
      </span>
      <input
        className={styles.input}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
);

Input.defaultProps = {
  placeholder: '',
  errorMessage: '',
  blackText: false,
};

export default Input;
