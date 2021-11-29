import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { setLocale } from 'yup';
import LoginPage from './components/LoginPage/LoginPage';
import styles from './App.module.scss';
import { useAppDispatch, useAppSelector } from './utils/hooks';
import { selectIsLoggedIn, tryAutoLogin } from './store/slices/authSlice';
import MainPage from './components/MainPage/MainPage';

const App = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tryAutoLogin());
  }, []);

  setLocale({
    mixed: {
      required: 'Это поле обязятельно к заполнению',
      notType: ({ type }) => {
        let translatedType;
        switch (type) {
          case 'number':
            translatedType = 'число';
            break;
          case 'string':
            translatedType = 'строку';
            break;
          default:
            break;
        }
        return `Введите ${translatedType}`;
      },
    },
    string: {
      max: ({ max }) => `Не более ${max} символов`,
    },
    number: {
      positive: 'Число в поле должно быть положительным',
      integer: 'Число в поле должно быть целым',
    },
  });

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
