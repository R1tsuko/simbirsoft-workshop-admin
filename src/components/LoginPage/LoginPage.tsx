import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import styles from './LoginPage.module.scss';
import Logo from '../ui/Logo/Logo';

function LoginPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContainer}>
        <Logo />

        <div className={styles.formWrapper}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
