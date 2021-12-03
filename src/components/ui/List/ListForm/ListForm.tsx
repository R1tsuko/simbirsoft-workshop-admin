import React from 'react';
import { ListFormFields } from '../../../../utils/types/formTypes';
import Button from '../../Button/Button';
import Select from '../../Select/Select';
import styles from './ListForm.module.scss';

interface IListFormProps {
  fields: ListFormFields;
}

const ListForm: React.FC<IListFormProps> = ({ fields }) => (
  <form className={styles.form}>
    <div className={styles.fieldsContainer}>
      {fields.map((field) => (
        <div className={styles.fieldWrapper} key={field.name}>
          <Select name={field.name} options={field.options} />
        </div>
      ))}
    </div>
    <div className={styles.buttonsContainer}>
      <div className={styles.buttonWrapper}>
        <Button type='submit' text='Применить' />
      </div>
      <div className={styles.buttonWrapper}>
        <Button type='reset' text='Очистить' red />
      </div>
    </div>
  </form>
);

export default ListForm;
