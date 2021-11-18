import React from 'react';
import styles from './ErrorTab.module.scss';

const ErrorTab = () => (
    <div className={styles.tabContainer}>
      <div className={styles.errorCode}>500</div>
      <div className={styles.errorMessage}>Что-то пошло не так</div>
      <div className={styles.advice}>Попробуйте перезагрузить страницу</div>
    </div>
  );
export default ErrorTab;
