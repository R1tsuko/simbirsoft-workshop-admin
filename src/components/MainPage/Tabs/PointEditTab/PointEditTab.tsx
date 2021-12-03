import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  deletePoint,
  pickEditingPoint,
  savePoint,
  selectEditingPoint,
  selectIsPointSubmitting,
} from '../../../../store/slices/editSlice';
import { selectCities } from '../../../../store/slices/mainSlice';
import { IPointFormData } from '../../../../utils/types/formTypes';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import Input from '../../../ui/Input/Input';
import EditTabOptions from '../../../ui/EditTabOptions/EditTabOptions';
import EditTabCard from '../../../ui/EditTabCard/EditTabCard';
import Select from '../../../ui/Select/Select';
import { pointFormSchema } from '../../../../utils/validationSchemas';
import styles from './PointEditTab.module.scss';

const PointEditTab = () => {
  const point = useAppSelector(selectEditingPoint);
  const cities = useAppSelector(selectCities);
  const isSubmitting = useAppSelector(selectIsPointSubmitting);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPointFormData>({
    defaultValues: {
      name: point?.name,
      address: point?.address,
      cityId: point?.cityId?.id,
    },
    resolver: yupResolver(pointFormSchema),
  });

  useEffect(() => {
    if (!point) {
      reset({});
    }
  }, [point]);

  const onSubmit = handleSubmit((pointFormData) => {
    dispatch(savePoint({ postPointData: pointFormData, pointId: point?.id }));
  });

  const onResetClick = () => {
    dispatch(pickEditingPoint(null));
  };

  const onDeleteClick = () => {
    dispatch(deletePoint(point?.id as string));
  };

  return (
    <form className={styles.tabContainer} onSubmit={onSubmit}>
      <EditTabCard
        title={point?.name || 'Название'}
        subtitle={point ? `${point?.cityId?.name} ${point?.address}` : 'Город'}
      />

      <EditTabOptions
        title='Настройки пункта'
        onResetClick={onResetClick}
        deleteControlDisabled={!point}
        isSubmitting={isSubmitting}
        onDeleteClick={onDeleteClick}
      >
        <Select
          labelText='Город'
          name='city'
          options={cities.map((city) => ({
            id: city.id,
            value: city.name,
          }))}
          registerReturn={register('cityId')}
        />

        <Input
          labelText='Адрес'
          type='text'
          {...register('address')}
          errorMessage={errors.address?.message}
          blackText
        />

        <Input
          labelText='Название'
          type='text'
          {...register('name')}
          errorMessage={errors.name?.message}
          blackText
        />
      </EditTabOptions>
    </form>
  );
};
export default PointEditTab;
