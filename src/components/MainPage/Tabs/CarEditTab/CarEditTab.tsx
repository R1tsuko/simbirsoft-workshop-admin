import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
import {
  calculateCarFormProgress,
  getCarImg,
  mapCarFormDataToPostCarData,
} from '../../../../utils/helpers/commonHelpers';
import Input from '../../../ui/Input/Input';
import EditTabOptions from '../../../ui/EditTabOptions/EditTabOptions';
import EditTabCard from '../../../ui/EditTabCard/EditTabCard';
import Select from '../../../ui/Select/Select';
import ColorsInput from '../../../ui/ColorsInput/ColorsInput';
import { carFormSchema } from '../../../../utils/validationSchemas';
import styles from './CarEditTab.module.scss';

const CarEditTab = () => {
  const categories = useAppSelector(selectCarCategories);
  const car = useAppSelector(selectEditingCar);
  const isSubmitting = useAppSelector(selectIsCarSubmitting);
  const dispatch = useAppDispatch();
  const [carImg, setCarImg] = useState<string>(getCarImg(car));

  const [schemaContext, setSchemaContext] = useState({ isCreatingCar: !car });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm<ICarFormData>({
    context: schemaContext,
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
    resolver: yupResolver(carFormSchema),
  });

  useEffect(() => {
    setCarImg(getCarImg(car));
    if (!car) {
      reset({ colors: [] });
      setSchemaContext({ isCreatingCar: true });
    } else {
      setSchemaContext({ isCreatingCar: false });
    }
  }, [car]);

  const onSubmit = handleSubmit((formData) => {
    dispatch(
      saveCar({
        postCarData: mapCarFormDataToPostCarData(formData),
        carId: car?.id,
      })
    );
  });

  const onAddColor = () => {
    clearErrors('colors');
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
        descriptionRegisterReturn={register('description')}
        imgInputRegisterReturn={register('imageFileList')}
        imgInputErrorMessage={errors.imageFileList?.message}
        control={control}
        progressCalculateFunction={calculateCarFormProgress(!car)}
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
        <ColorsInput
          register={register}
          control={control}
          onAddColor={onAddColor}
          errorMessage={
            (errors.colors as unknown as { message: string })?.message
          }
        />
      </EditTabOptions>
    </form>
  );
};
export default CarEditTab;
