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
import { ILoginData } from '../../../utils/types/formTypes';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import { loginFormSchema } from '../../../utils/validationSchemas';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isError = useAppSelector(selectIsLoginError);
  const isSubmitting = useAppSelector(selectIsSubmitting);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({ resolver: yupResolver(loginFormSchema) });

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
            <Input
              labelText='Почта'
              type='text'
              {...register('username', {
                required: true,
                maxLength: 15,
              })}
              errorMessage={errors.username?.message}
            />
            <Input
              labelText='Пароль'
              type='password'
              {...register('password', {
                required: true,
              })}
              errorMessage={errors.password?.message}
            />
          </div>
          <div className={styles.controls}>
            <div className={styles.register}>Запросить доступ</div>
            <div className={styles.submitWrapper}>
              <Button type='submit' text='Войти' />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
