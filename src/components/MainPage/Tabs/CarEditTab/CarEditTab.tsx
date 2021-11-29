import React, { useState, useRef, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  pickEditingCar,
  selectEditingCar,
  saveCar,
  selectIsCarSubmitting,
  deleteCar,
} from '../../../../store/slices/editSlice';
import { selectCarCategories } from '../../../../store/slices/mainSlice';
import { useAppSelector, useAppDispatch } from '../../../../utils/hooks';
import { ICarFormData } from '../../../../utils/types/formTypes';
import { IPostCarData } from '../../../../utils/types/apiTypes';
import { getCarImg } from '../../../../utils/helpers/commonHelpers';
import Input from '../../../ui/Input/Input';
import EditTabOptions from '../../../ui/EditTabOptions/EditTabOptions';
import EditTabCard from '../../../ui/EditTabCard/EditTabCard';
import Select from '../../../ui/Select/Select';
import styles from './CarEditTab.module.scss';

const CarEditTab = () => {
  const [carImgName, setCarImgName] = useState<string | undefined>(undefined);
  const categories = useAppSelector(selectCarCategories);
  const car = useAppSelector(selectEditingCar);
  const isSubmitting = useAppSelector(selectIsCarSubmitting);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [carImg, setCarImg] = useState<string>(getCarImg(car));

  const schema = yup.object({
    name: yup.string().max(100).required(),
    priceMin: yup.number().positive().required(),
    priceMax: yup.number().positive().required(),
    tank: yup
      .number()
      .transform((cv, ov) => ov === '' ? undefined : cv)
      .min(0)
      .max(100),
    imageFileList: yup
      .mixed()
      .test(
        'fileListLength',
        'Вы не выбрали файл',
        (fileList: FileList | Array<File>) =>
          Boolean(car) || fileList.length === 1
      ),
    colors: yup
      .mixed()
      .test(
        'colorsLength',
        'Вы не ввели ни одного цвета',
        (colors: Array<string>) => Boolean(colors.length)
      ),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ICarFormData>({
    defaultValues: {
      description: car?.description,
      name: car?.name,
      categoryId: car?.categoryId.id,
      priceMin: car?.priceMin,
      priceMax: car?.priceMax,
      colors: car?.colors.map((color) => ({
        name: color,
      })),
      tank: car?.tank,
    },
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'colors' });
  const tankFullness = watch('tank', car ? undefined : 0);

  useEffect(() => {
    setCarImg(getCarImg(car));
    if (!car) {
      reset({ colors: [] });
    }
  }, [car]);

  const onSubmit = handleSubmit(
    ({
      description,
      name,
      imageFileList,
      priceMin,
      priceMax,
      categoryId,
      colors,
      tank,
    }) => {
      const postCarData: IPostCarData = {
        name,
        description,
        thumbnail: imageFileList[0],
        priceMin,
        priceMax,
        categoryId: { id: categoryId },
        colors: colors.map((color) => color.name),
        tank,
      };
      dispatch(saveCar({ postCarData, carId: car?.id }));
    }
  );

  const onAddImg = (img: File | undefined) => {
    if (img) {
      setCarImg(URL.createObjectURL(img));
      setCarImgName(img?.name);
    }
  };

  const onAddColorClick = () => {
    const color = colorInputRef.current?.value;
    if (!fields.find((field) => field.name === color) && color) {
      append({ name: colorInputRef.current?.value }, { shouldFocus: false });
    }
    if (colorInputRef.current) {
      colorInputRef.current.value = '';
    }
  };

  const onRemoveColorClick = (index: number) => () => {
    remove(index);
  };

  const onResetClick = () => {
    dispatch(pickEditingCar(null));
  };

  const onDeleteClick = () => {
    dispatch(deleteCar(car?.id as string));
  };

  return (
    <form className={styles.tabContainer} onSubmit={onSubmit}>
      <EditTabCard
        title={car?.name || 'Название'}
        subtitle={car?.categoryId.name || 'Категория'}
        img={carImg}
        imgName={carImgName}
        descriptionRegisterReturn={register('description')}
        imgInputRegisterReturn={register('imageFileList')}
        onAddImg={onAddImg}
        imgInputErrorMessage={errors.imageFileList?.message}
        fullness={String(tankFullness)}
      />

      <EditTabOptions
        title='Настройки автомобиля'
        onResetClick={onResetClick}
        onDeleteClick={onDeleteClick}
        deleteControlDisabled={!car}
        isSubmitting={isSubmitting}
      >
        <Input
          labelText='Модель автомобиля'
          type='text'
          {...register('name')}
          errorMessage={errors.name?.message}
          blackText
        />
        <Input
          labelText='Минимальная цена'
          type='text'
          {...register('priceMin')}
          errorMessage={errors.priceMin?.message}
          blackText
        />
        <Input
          labelText='Максимальная цена'
          type='text'
          {...register('priceMax')}
          errorMessage={errors.priceMax?.message}
          blackText
        />
        <Select
          labelText='Тип автомобиля'
          name='category'
          options={categories.map((category) => ({
            id: category.id,
            value: category.name,
          }))}
          registerReturn={register('categoryId')}
        />
        <Input
          labelText='Заполненность бака'
          type='text'
          {...register('tank')}
          errorMessage={errors.tank?.message}
          blackText
        />
        <div className={styles.colorsFieldContainer}>
          <div className={styles.field}>
            <div className={styles.colorsInputWrapper}>
              <Input
                labelText='Доступные цвета'
                name='colorsInput'
                type='text'
                blackText
                ref={colorInputRef}
                errorMessage={
                  (errors.colors as unknown as { message: string })?.message
                }
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
      </EditTabOptions>
    </form>
  );
};
export default CarEditTab;
