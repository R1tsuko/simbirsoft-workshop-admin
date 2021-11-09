import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import styles from './LoginPage.module.scss';
import logoIcon from '../../assets/icons/Logo.svg';

function LoginPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.logo}>
          <img src={logoIcon} alt='logo' />
          <div className={styles.title}>Need for car</div>
        </div>
        
        <div className={styles.formWrapper}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
