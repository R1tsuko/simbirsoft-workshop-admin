import React from 'react';
import Button from '../Button/Button';
import styles from './EditFormControls.module.scss';

const EditFormControls = () => (
  <div className={styles.controlsContainer}>
    <div className={styles.submitWrapper}>
      <Button text='Сохранить' type='submit' />
    </div>
    <div className={styles.resetWrapper}>
      <Button text='Отменить' type='reset' gray />
    </div>
    <div className={styles.deleteWrapper}>
      <Button text='Удалить' type='button' red />
    </div>
  </div>
);
export default EditFormControls;
