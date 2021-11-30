import React, { useRef } from 'react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import { ICarFormData } from '../../../utils/types/formTypes';
import Input from '../Input/Input';
import styles from './ColorsInput.module.scss';

interface IColorsInputProps {
  control: Control<ICarFormData>;
  onAddColor: (colorName?: string) => void;
  errorMessage?: string;
  register: UseFormRegister<ICarFormData>;
}

const ColorsInput: React.FC<IColorsInputProps> = ({
  control,
  onAddColor,
  errorMessage,
  register,
}) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const { fields, append, remove } = useFieldArray({ control, name: 'colors' });

  const onAddColorClick = () => {
    const color = colorInputRef.current?.value;
    if (!fields.find((field) => field.name === color) && color) {
      append({ name: colorInputRef.current?.value }, { shouldFocus: false });
      onAddColor(color);
    }
    if (colorInputRef.current) {
      colorInputRef.current.value = '';
    }
  };

  const onRemoveColorClick = (index: number) => () => {
    remove(index);
  };

  return (
    <div className={styles.colorsFieldContainer}>
      <div className={styles.field}>
        <div className={styles.colorsInputWrapper}>
          <Input
            labelText='Доступные цвета'
            name='colorsInput'
            type='text'
            blackText
            ref={colorInputRef}
            errorMessage={errorMessage}
          />
        </div>
        <button
          className={styles.plusButton}
          type='button'
          onClick={onAddColorClick}
        >
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
        {fields.map((field, index) => (
          <div className={styles.color} key={field.id}>
            <button
              className={styles.removeButton}
              type='button'
              onClick={onRemoveColorClick(index)}
            >
              <svg
                width='10'
                height='10'
                xmlns='http://www.w3.org/2000/svg'
                stroke='#BECAD6'
              >
                <path d='M1 5 H9' strokeWidth='1' strokeLinecap='round' />
              </svg>
            </button>
            <input
              className={styles.input}
              disabled
              {...register(`colors.${index}.name` as const)}
              defaultValue={field.name}
            />
            {field.name}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ColorsInput;
