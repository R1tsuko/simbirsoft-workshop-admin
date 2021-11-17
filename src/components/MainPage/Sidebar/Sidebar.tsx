import React from 'react';
import Logo from '../../ui/Logo/Logo';
import NavBar from '../NavBar/NavBar';
import styles from './Sidebar.module.scss';

const Sidebar = () => (
  <aside className={styles.sidebar}>
    <div className={styles.logoWrapper}>
      <Logo />
    </div>
    <NavBar />
  </aside>
);

export default Sidebar;
