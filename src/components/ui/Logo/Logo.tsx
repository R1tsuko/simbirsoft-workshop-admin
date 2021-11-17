import React from 'react';
import logoIcon from '../../../assets/icons/Logo.svg';
import styles from './Logo.module.scss';

const Logo = () => (
    <div className={styles.logo}>
      <img src={logoIcon} alt='logo' />
      <div className={styles.title}>Need for car</div>
    </div>
  );

export default Logo;
