/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import styles from './App.module.scss';
import { useAppDispatch, useAppSelector } from './utils/hooks';
import { logout, selectIsLoggedIn, tryAutoLogin } from './store/slices/authSlice';

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
          {isLoggedIn ? (
            <div>
              u are authorized!!!
              <button
                onClick={() => {
                  dispatch(logout())
                }}
              >
                выйти
              </button>
            </div>
          ) : (
            <Redirect to='/login' />
          )}
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
