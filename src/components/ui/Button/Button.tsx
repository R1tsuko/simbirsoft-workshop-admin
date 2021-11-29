/* eslint-disable react/button-has-type */
import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface IButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  red?: boolean;
  gray?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<IButtonProps> = ({ text, type, red, onClick, gray, disabled }) => (
  <button
    className={classNames(styles.button, {
      [styles.red]: red,
      [styles.gray]: gray,
      [styles.disabled]: disabled,
    })}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

Button.defaultProps = {
  red: false,
  gray: false,
  onClick: undefined,
  disabled: false,
};

export default Button;
