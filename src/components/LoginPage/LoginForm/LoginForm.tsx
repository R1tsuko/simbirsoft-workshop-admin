/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import {
  login,
  selectIsLoginError,
  selectIsSubmitting,
} from '../../../store/slices/authSlice';
import Loader from '../../ui/Loader/Loader';
import { ILoginData } from '../../../utils/types';
import styles from './LoginForm.module.scss';


const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isError = useAppSelector(selectIsLoginError);
  const isSubmitting = useAppSelector(selectIsSubmitting);

  const {
    register,
    handleSubmit,
  } = useForm<ILoginData>();

  const onSubmit = handleSubmit((data) => dispatch(login(data)));

  return (
    <div className={styles.formWrapper}>
      {isSubmitting ? (
        <Loader />
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.title}>Вход</div>

          {isError ? (
            <div className={styles.formErrorMessage}>
              Неверный логин и/или пароль
            </div>
          ) : null}

          <div className={styles.inputsContainer}>
            <label className={styles.label} htmlFor='username'>
              Почта
            </label>
            <input
              className={styles.input}
              id='username'
              type='text'
              {...register('username')}
            />

            <label className={styles.label} htmlFor='password'>
              Пароль
            </label>
            <input
              className={styles.input}
              id='password'
              type='password'
              {...register('password')}
            />
          </div>
          <div className={styles.controls}>
            <div className={styles.register}>Запросить доступ</div>
            <button className={styles.submit} type='submit'>
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
