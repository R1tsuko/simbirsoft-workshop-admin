import React from 'react';
import { DeepPartial, Path, UnpackNestedValue, useForm } from 'react-hook-form';
import { DEFAULT_LIST_FORM_ITEM_ID } from '../../../../utils/constants';
import { clearFromListFormData } from '../../../../utils/helpers/commonHelpers';
import { ISearchItem } from '../../../../utils/types/commonTypes';
import { ListFormFields } from '../../../../utils/types/formTypes';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import styles from './ListForm.module.scss';

interface IListFormProps<T> {
  fields: ListFormFields<T>;
  onApplyFilters: (formData: T) => void;
  defaultValues: T;
}

function ListForm<T>({
  fields,
  onApplyFilters,
  defaultValues,
}: IListFormProps<T>) {
  const { register, handleSubmit } = useForm<T>({
    defaultValues: clearFromListFormData(defaultValues) as UnpackNestedValue<
      DeepPartial<T>
    >,
  });

  const onSubmit = handleSubmit((formData) => {
    onApplyFilters?.(formData as T);
  });

  const onReset = () => {
    const resetFields = { ...defaultValues } as typeof defaultValues;
    if (resetFields) {
      Object.keys(resetFields).forEach((key) => {
        const value = resetFields[key as keyof T];
        resetFields[key as keyof T] =
          DEFAULT_LIST_FORM_ITEM_ID as unknown as typeof value;
      });
    }
    onApplyFilters?.(resetFields as T);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
      <div className={styles.fieldsContainer}>
        {Object.keys(fields).map((fieldName) => (
          <div className={styles.fieldWrapper} key={fieldName}>
            {fields?.[fieldName as keyof T].type === 'select' ? (
              <Select
                name={fieldName}
                registerReturn={register(fieldName as Path<T>)}
                options={
                  (
                    fields?.[fieldName as keyof T] as {
                      options: Array<ISearchItem>;
                    }
                  ).options
                }
              />
            ) : (
              <Input
                type='text'
                {...register(fieldName as Path<T>)}
                placeholder={
                  (
                    fields?.[fieldName as keyof T] as {
                      placeholder: string;
                    }
                  ).placeholder
                }
                blackText
              />
            )}
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
}

export default ListForm;
