import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';

interface IStyledNavlinkProps {
  text: string;
  type: 'ordersList' | 'list' | 'editTab';
  to: string;
}

const StyledNavLink: React.FC<IStyledNavlinkProps> = ({ text, to, type }) => (
  <NavLink className={styles.navlink} activeClassName={styles.active} to={to}>
    <svg
      width='13'
      height='12'
      viewBox='0 0 13 10'
      xmlns='http://www.w3.org/2000/svg'
      className={styles.icon}
    >
      {type === 'ordersList' && (
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M0.5 0.5V1.85714H5.83333V0.5H0.5ZM5.83333 4.57142H0.5V3.21428H5.83333V4.57142ZM0.5 7.28572H5.83333V5.92857H0.5V7.28572ZM0.5 10H5.83333V8.64285H0.5V10ZM12.5 0.5H7.16663V10H12.5V0.5Z'
        />
      )}

      {type === 'list' && (
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M4.17647 5.11538H0.5V0.5H4.17647V5.11538ZM4.17647 10.5H0.5V5.88461H4.17647V10.5ZM4.91174 10.5H8.58821V5.88461H4.91174V10.5ZM13 10.5H9.32349V5.88461H13V10.5ZM4.91174 5.11538H8.58821V0.5H4.91174V5.11538ZM9.32349 5.11538V0.5H13V5.11538H9.32349Z'
        />
      )}

      {type === 'editTab' && (
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M11.3213 2.10853C11.5596 2.34683 11.5596 2.73177 11.3213 2.97007L10.2031 4.08825L7.91174 1.7969L9.02992 0.678725C9.26822 0.440425 9.65317 0.440425 9.89147 0.678725L11.3213 2.10853ZM0.5 11.5V9.20865L7.25795 2.4507L9.5493 4.74205L2.79135 11.5H0.5Z'
        />
      )}
    </svg>

    <div className={styles.linkWrapper}>{text}</div>
  </NavLink>
);

const navbarData: Array<IStyledNavlinkProps> = [
  {
    to: '/admin/orders',
    text: 'Заказы',
    type: 'ordersList',
  },
  {
    to: '/admin/cars',
    text: 'Список авто',
    type: 'list',
  },
  {
    to: '/admin/points',
    text: 'Список пунктов',
    type: 'list',
  },
  {
    to: '/admin/rates',
    text: 'Список тарифов',
    type: 'list',
  },
  {
    to: '/admin/edit/car',
    text: 'Карточка автомобиля',
    type: 'editTab',
  },
  {
    to: '/admin/edit/rate',
    text: 'Карточка тарифа',
    type: 'editTab',
  },
  {
    to: '/admin/edit/point',
    text: 'Карточка пункта',
    type: 'editTab',
  },
];

const NavBar = () => (
  <nav className={styles.nav}>
    {navbarData.map(({ text, to, type }) => (
      <StyledNavLink text={text} to={to} type={type} key={to} />
    ))}
  </nav>
);

export default NavBar;
