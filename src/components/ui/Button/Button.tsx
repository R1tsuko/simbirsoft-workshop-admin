/* eslint-disable react/button-has-type */
import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface IButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  red?: boolean;
  gray?: boolean;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({ text, type, red, onClick, gray }) => (
  <button
    className={classNames(styles.button, {
      [styles.red]: red,
      [styles.gray]: gray,
    })}
    type={type}
    onClick={onClick}
  >
    {text}
  </button>
);

Button.defaultProps = {
  red: false,
  gray: false,
  onClick: undefined,
};

export default Button;
