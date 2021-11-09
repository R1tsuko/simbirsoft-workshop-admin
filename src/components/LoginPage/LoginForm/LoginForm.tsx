/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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

  const schema = yup.object({
    username: yup
      .string()
      .max(15, 'Не более 15 символов')
      .required('Это поле обязательно к заполнению'),
    password: yup
      .string()
      .max(15, 'Не более 15 символов')
      .required('Это поле обязательно к заполнению'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => dispatch(login(data)));

  return (
    <div className={styles.formWrapper}>
      {isSubmitting ? (
        <Loader />
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.title}>Вход</div>

          {isError && (
            <div className={styles.formErrorMessageWrapper}>
              <span className={styles.errorMessage}>
                Неверный логин и/или пароль
              </span>
            </div>
          )}

          <div className={styles.inputsContainer}>
            <label className={styles.label} htmlFor='username'>
              Почта
            </label>
            <span className={styles.inputErrorMessageWrapper}>
              <span className={styles.errorMessage}>
                {errors.username?.message}
              </span>
            </span>
            <input
              className={styles.input}
              id='username'
              type='text'
              {...register('username', { required: true, maxLength: 15 })}
            />

            <label className={styles.label} htmlFor='password'>
              Пароль
            </label>
            <span className={styles.inputErrorMessageWrapper}>
              <span className={styles.errorMessage}>
                {errors.password?.message}
              </span>
            </span>
            <input
              className={styles.input}
              id='password'
              type='password'
              {...register('password', { required: true })}
            />
          </div>
          <div className={styles.controls}>
            <div className={styles.register}>Запросить доступ</div>
            <button className={styles.submit} type='submit'>
              Войти
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
