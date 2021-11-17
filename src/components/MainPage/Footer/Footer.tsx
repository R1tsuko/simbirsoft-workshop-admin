import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a className={styles.link} href="/">Главная страница</a>
        <a className={styles.link} href="/">NFD</a>
      </div>
      <div className={styles.license}>Copyright © 2020 Simbirsoft</div>
    </footer>
  );
}

export default Footer;
