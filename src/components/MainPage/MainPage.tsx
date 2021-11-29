import React, { ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import { Route } from 'react-router-dom';
import {
  initializeApp,
  selectAlertMessage,
  selectIsInitializing,
  setAlertMessage,
} from '../../store/slices/mainSlice';
import { useAppDispatch, useAppSelector, useToggle } from '../../utils/hooks';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Menu from './Menu/Menu';
import OrdersTab from './Tabs/OrdersTab/OrdersTab';
import Sidebar from './Sidebar/Sidebar';
import PointsTab from './Tabs/PointsTab/PointsTab';
import CarsTab from './Tabs/CarsTab/CarsTab';
import RatesTab from './Tabs/RatesTab/RatesTab';
import ErrorTab from './Tabs/ErrorTab/ErrorTab';
import CarEditTab from './Tabs/CarEditTab/CarEditTab';
import PointEditTab from './Tabs/PointEditTab/PointEditTab';
import RateEditTab from './Tabs/RateEditTab/RateEditTab';
import Loader from '../ui/Loader/Loader';
import styles from './MainPage.module.scss';

interface IRouteWithTitleProps {
  path: string;
  title: string;
  children: ReactNode;
}

const RouteWithTitle: React.FC<IRouteWithTitleProps> = ({
  path,
  title,
  children,
}) => (
  <Route path={path}>
    <section className={styles.content}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  </Route>
);

const MainPage = () => {
  const [isMenuOpened, toggleMenu] = useToggle(false);
  const [isAlertOpened, toggleAlert] = useToggle(false);
  const isInitializing = useAppSelector(selectIsInitializing);
  const alertMessage = useAppSelector(selectAlertMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  useEffect(() => {
    if (alertMessage && !isAlertOpened) {
      toggleAlert();
      setTimeout(() => {
        toggleAlert();
        dispatch(setAlertMessage(null));
      }, 3000);
    }
  }, [alertMessage]);

  return (
    <div className={styles.pageContainer}>
      <Header isMenuOpened={isMenuOpened} onToggleMenu={toggleMenu} />
      <main className={styles.main}>
        {isInitializing ? (
          <Loader />
        ) : (
          <>
            <div
              className={classNames(styles.alertContainer, {
                [styles.active]: isAlertOpened,
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
              {alertMessage}
            </div>

            <RouteWithTitle title='Заказы' path='/admin/orders'>
              <OrdersTab />
            </RouteWithTitle>
            <RouteWithTitle path='/admin/points' title='Пункты'>
              <PointsTab />
            </RouteWithTitle>
            <RouteWithTitle path='/admin/cars' title='Авто'>
              <CarsTab />
            </RouteWithTitle>
            <RouteWithTitle path='/admin/rates' title='Тарифы'>
              <RatesTab />
            </RouteWithTitle>
            <RouteWithTitle path='/admin/new/car' title='Карточка автомобиля'>
              <CarEditTab />
            </RouteWithTitle>
            <RouteWithTitle path='/admin/edit/car' title='Карточка автомобиля'>
              <CarEditTab />
            </RouteWithTitle>
            <RouteWithTitle path='/admin/new/point' title='Карточка пункта'>
              <PointEditTab />
            </RouteWithTitle>
            <RouteWithTitle path='/admin/edit/point' title='Карточка пункта'>
              <PointEditTab />
            </RouteWithTitle>
            <RouteWithTitle path='/admin/new/rate' title='Карточка тарифа'>
              <RateEditTab />
            </RouteWithTitle>
            <RouteWithTitle path='/admin/edit/rate' title='Карточка тарифа'>
              <RateEditTab />
            </RouteWithTitle>
            <Route path='/admin/error'>
              <ErrorTab />
            </Route>
          </>
        )}
      </main>
      <Footer />
      <Sidebar />
      <Menu isActive={isMenuOpened} />
    </div>
  );
};

export default MainPage;
