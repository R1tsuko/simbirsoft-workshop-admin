import React, { ReactNode, useEffect } from 'react';
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
import ErrorTab from './Tabs/ErrorTab/ErrorTab';
import CarEditTab from './Tabs/CarEditTab/CarEditTab';
import PointEditTab from './Tabs/PointEditTab/PointEditTab';
import Loader from '../ui/Loader/Loader';
import Alert from '../ui/Alert/Alert';
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
            <Alert message={alertMessage} isOpened={isAlertOpened} />
            <RouteWithTitle title='Заказы' path='/admin/orders'>
              <OrdersTab />
            </RouteWithTitle>
            <RouteWithTitle path='/admin/points' title='Пункты'>
              <PointsTab />
            </RouteWithTitle>
            <RouteWithTitle path='/admin/cars' title='Авто'>
              <CarsTab />
            </RouteWithTitle>
            <RouteWithTitle path='/admin/edit/car' title='Карточка автомобиля'>
              <CarEditTab />
            </RouteWithTitle>
            <RouteWithTitle path='/admin/edit/point' title='Карточка пункта'>
              <PointEditTab />
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
