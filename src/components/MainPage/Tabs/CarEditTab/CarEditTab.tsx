import React from 'react';
import Input from '../../../ui/Input/Input';
import EditTabOptions from '../../../ui/EditTabOptions/EditTabOptions';
import EditTabCard from '../../../ui/EditTabCard/EditTabCard';
import styles from './CarEditTab.module.scss';
import defaultCarImg from '../../../../assets/images/DefaultCar.jpg';

const CarEditTab = () => (
  <form className={styles.tabContainer}>
    <EditTabCard
      title='Hyndai, i30 N'
      subtitle='Компакт кар'
      img={defaultCarImg}
      progressFulness='74'
      description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae quod dolorum sint alias, possimus illum assumenda eligendi cumque?'
    />

    <EditTabOptions title='Настройки автомобиля'>
      <Input
        labelText='Модель автомобиля'
        id='model'
        type='text'
        errorMessage='Пример ошибки валидации'
        blackText
      />
      <Input labelText='Тип автомобиля' id='category' type='text' blackText />
      <div className={styles.colorsFieldContainer}>
        <div className={styles.field}>
          <div className={styles.colorsInputWrapper}>
            <Input labelText='Доступные цвета' id='color' type='text' blackText />
          </div>
          <button className={styles.plusButton} type='button'>
            <svg
              width='18'
              height='18'
              xmlns='http://www.w3.org/2000/svg'
              stroke='#BECAD6'
            >
              <path d='M1 9 H17' strokeWidth='2' strokeLinecap='round' />
              <path d='M9 1 V17' strokeWidth='2' strokeLinecap='round' />
            </svg>
          </button>
        </div>
        <div className={styles.colorsList}>
          <div className={styles.color}>
            <button className={styles.removeButton} type='button'>
              <svg
                width='10'
                height='10'
                xmlns='http://www.w3.org/2000/svg'
                stroke='#BECAD6'
              >
                <path d='M1 5 H9' strokeWidth='1' strokeLinecap='round' />
              </svg>
            </button>
            Красный
          </div>
        </div>
      </div>
    </EditTabOptions>
  </form>
);
export default CarEditTab;
