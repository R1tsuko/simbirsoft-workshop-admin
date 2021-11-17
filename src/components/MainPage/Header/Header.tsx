import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useToggle } from '../../../utils/hooks';
import { logout } from '../../../store/slices/authSlice';
import styles from './Header.module.scss';
import defaultAvatar from '../../../assets/images/DefaultAvatar.jpg';

interface IHeaderProps {
  isMenuOpened: boolean;
  onToggleMenu: () => void;
}

const Header: React.FC<IHeaderProps> = ({ isMenuOpened, onToggleMenu }) => {
  const [isDropMenuActive, toggleDropMenu] = useToggle(false);
  const dispatch = useAppDispatch();

  const onDropMenuItemClick = () => dispatch(logout());

  return (
    <header className={styles.header}>
      <div className={styles.burgerMenuButtonWrapper}>
        <button
          className={classNames(styles.burgerButton, {
            [styles.active]: isMenuOpened,
          })}
          onClick={onToggleMenu}
          type='button'
        >
          <svg
            className={styles.burger}
            version='1.1'
            height='32'
            width='32'
            viewBox='0 0 32 32'
            stroke='black'
          >
            <path className={styles.line} d='M 2 7 H 30' />
            <path className={styles.line} d='M 2 16 H 30' />
            <path className={styles.line} d='M 2 25 H 30' />
          </svg>
          <svg
            className={styles.x}
            version='1.1'
            height='32'
            width='32'
            viewBox='0 0 32 32'
            stroke='black'
          >
            <path className={styles.line} d='M 3 29 L 29 3' />
            <path className={styles.line} d='M 3 3 L 29 29' />
          </svg>
        </button>
      </div>
      <div className={styles.notifications}>
        <div className={styles.notificationsWrapper}>
          <svg
            width='18'
            height='21'
            viewBox='0 0 18 21'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M15.375 9.04949V14.3727L17.5 16.502V17.5667H0.5V16.502L2.625 14.3727V9.04949C2.625 5.77038 4.35687 3.04489 7.40625 2.32093V1.59697C7.40625 0.713313 8.11812 0 9 0C9.88188 0 10.5938 0.713313 10.5938 1.59697V2.32093C13.6325 3.04489 15.375 5.78103 15.375 9.04949ZM11.2667 18.7C11.2667 19.9467 10.2467 20.9667 9 20.9667C7.742 20.9667 6.73334 19.9467 6.73334 18.7H11.2667Z'
              fill='#818EA3'
            />
          </svg>
          <div className={styles.count}>2</div>
        </div>
      </div>
      <div className={styles.userDetails}>
        <button
          className={styles.dropMenuButton}
          onClick={toggleDropMenu}
          type='button'
        >
          <img className={styles.avatar} src={defaultAvatar} alt='avatar' />
          Admin
          <div className={styles.dropdownIconWrapper}>
            <svg
              width='9'
              height='5'
              viewBox='0 0 9 5'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0 0.5L4.25 5L8.5 0.5H0Z' fill='#ABB6BF' />
            </svg>
          </div>
        </button>
        <div
          className={classNames(styles.dropMenu, {
            [styles.active]: isDropMenuActive,
          })}
        >
          <div
            className={styles.item}
            onClick={onDropMenuItemClick}
            onKeyDown={onDropMenuItemClick}
            tabIndex={0}
            role='menuitem'
          >
            Выйти
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
