import classNames from 'classnames';
import React from 'react';
import NavBar from '../NavBar/NavBar';
import styles from './Menu.module.scss';

interface IMenuProps {
  isActive: boolean;
}

const Menu: React.FC<IMenuProps> = ({ isActive }) => (
  <div
    className={classNames(styles.menuContainer, {
      [styles.active]: isActive,
    })}
  >
    <NavBar />
  </div>
);

export default Menu;
