import React from 'react';
import styles from './Checkbox.module.scss';

interface ICheckboxProps {
  labelText: string;
  disabled?: boolean;
  checked?: boolean;
}

const Checkbox: React.FC<ICheckboxProps> = ({
  labelText,
  disabled,
  checked,
}) => (
  <div className={styles.checkboxContainer}>
    <input
      className={styles.input}
      id={labelText}
      type='checkbox'
      disabled={disabled}
      checked={checked}
    />
    <label className={styles.label} htmlFor={labelText}>
      {labelText}
    </label>
  </div>
);

Checkbox.defaultProps = {
  disabled: false,
  checked: false,
};

export default Checkbox;
