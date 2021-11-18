import React, { ReactNode } from 'react';
import Button from '../Button/Button';
import styles from './EditTabOptions.module.scss';

interface IEditTabOptionsProps {
  title: string;
  children: ReactNode;
}

const EditTabOptions: React.FC<IEditTabOptionsProps> = ({
  title,
  children,
}) => (
  <section className={styles.options}>
    <h2 className={styles.title}>{title}</h2>
    <div className={styles.fieldsContainer}>
      {React.Children.map(children, (field) => (
        <div className={styles.inputWrapper}>{field}</div>
      ))}
    </div>

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
  </section>
);
export default EditTabOptions;
