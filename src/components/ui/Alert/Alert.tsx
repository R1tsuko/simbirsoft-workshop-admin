import React from 'react';
import classNames from 'classnames';
import styles from './Alert.module.scss';

interface IAlertProps {
  isOpened: boolean;
  message: string | null;
}

const Alert: React.FC<IAlertProps> = ({ isOpened, message }) => (
  <div
    className={classNames(styles.alertContainer, {
      [styles.active]: isOpened,
    })}
  >
    <svg
      width='14'
      height='10'
      viewBox='0 0 14 10'
      xmlns='http://www.w3.org/2000/svg'
      className={styles.icon}
    >
      <path
        xmlns='http://www.w3.org/2000/svg'
        d='M4.63132 7.88963L1.54946 4.78001L0.5 5.83147L4.63132 10L13.5 1.05145L12.4579 0L4.63132 7.88963Z'
        fill='white'
      />
    </svg>
    {message}
  </div>
);

export default Alert;
