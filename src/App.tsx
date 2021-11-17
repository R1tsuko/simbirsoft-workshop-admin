import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import styles from './App.module.scss';
import { useAppDispatch, useAppSelector } from './utils/hooks';
import {
  selectIsLoggedIn,
  tryAutoLogin,
} from './store/slices/authSlice';
import MainPage from './components/MainPage/MainPage';

const App = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tryAutoLogin());
  }, []);

  return (
    <div className={styles.appWrapper}>
      <Switch>
        <Route path='/admin'>
          {isLoggedIn ? <MainPage /> : <Redirect to='/login' />}
        </Route>

        <Route path='/login'>
          {isLoggedIn ? <Redirect to='/admin' /> : <LoginPage />}
        </Route>

        <Route path='/'>
          <Redirect to='/admin' />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
