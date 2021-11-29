import React, { FormEvent, ReactNode } from 'react';
import Button from '../Button/Button';
import styles from './EditTabOptions.module.scss';

interface IEditTabOptionsProps {
  title: string;
  children: ReactNode;
  onResetClick?: () => void;
  onDeleteClick?: () => void;
  deleteControlDisabled?: boolean;
  submitControlDisabled?: boolean;
  resetControlDisabled?: boolean;
  isSubmitting?: boolean;
}

const EditTabOptions: React.FC<IEditTabOptionsProps> = ({
  title,
  children,
  onResetClick,
  deleteControlDisabled,
  submitControlDisabled,
  resetControlDisabled,
  isSubmitting,
  onDeleteClick,
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
        <Button
          text='Сохранить'
          type='submit'
          disabled={submitControlDisabled || isSubmitting}
        />
      </div>
      <div className={styles.resetWrapper}>
        <Button
          text='Отменить'
          type='reset'
          gray
          onClick={(e: FormEvent<HTMLButtonElement>) => {
            e.preventDefault();
            onResetClick?.();
          }}
          disabled={resetControlDisabled || isSubmitting}
        />
      </div>
      <div className={styles.deleteWrapper}>
        <Button
          text='Удалить'
          type='button'
          disabled={deleteControlDisabled || isSubmitting}
          onClick={onDeleteClick}
          red
        />
      </div>
    </div>
  </section>
);

EditTabOptions.defaultProps = {
  onResetClick: () => null,
  submitControlDisabled: false,
  deleteControlDisabled: false,
  resetControlDisabled: false,
  isSubmitting: false,
  onDeleteClick: () => null,
};

export default EditTabOptions;
