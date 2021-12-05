import React, { useEffect } from 'react';
import { pickEditingCar } from '../../../../store/slices/editSlice';
import {
  getCars,
  selectCarsCount,
  selectCarsFilters,
  selectCarsPage,
  selectCarsToShow,
  selectIsCarsSubmitting,
  setCarsFiltersAndPage,
} from '../../../../store/slices/listSlice';
import { selectCarCategories } from '../../../../store/slices/mainSlice';
import {
  CARS_ON_PAGE,
  DEFAULT_LIST_FORM_ITEM_ID,
} from '../../../../utils/constants';
import { getCarImg } from '../../../../utils/helpers/commonHelpers';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import {
  ICarsListFormData,
  ListFormFields,
} from '../../../../utils/types/formTypes';
import List from '../../../ui/List/List';
import Table from '../../../ui/Table/Table';
import styles from './CarsTab.module.scss';

const ColorsContainer = ({ colors }: { colors: Array<string> }) => (
  <div className={styles.colorsContainer}>
    {colors.map((color) => (
      <div className={styles.color} key={color}>
        {color}
      </div>
    ))}
  </div>
);

const CarImgWrapper = ({ img }: { img: string }) => (
  <div className={styles.carImgWrapper}>
    <img className={styles.img} src={img} alt='auto' />
  </div>
);

const CarsTab = () => {
  const cars = useAppSelector(selectCarsToShow);
  const carsFilters = useAppSelector(selectCarsFilters);
  const carsCount = useAppSelector(selectCarsCount);
  const page = useAppSelector(selectCarsPage);
  const categories = useAppSelector(selectCarCategories);
  const isSubmitting = useAppSelector(selectIsCarsSubmitting);
  const dispatch = useAppDispatch();

  const onPageChange = (newPage: number) => {
    dispatch(setCarsFiltersAndPage({ formData: carsFilters, page: newPage }));
  };

  const onApplyFilters = (formData: ICarsListFormData) => {
    dispatch(setCarsFiltersAndPage({ formData, page: 0 }));
  };

  useEffect(() => {
    dispatch(getCars({ page, listFormData: carsFilters }));
  }, [page, carsFilters]);

  const listFormFields: ListFormFields<ICarsListFormData> = {
    categoryId: {
      type: 'select',
      options: [
        { value: 'Все категории', id: DEFAULT_LIST_FORM_ITEM_ID },
        ...categories.map((category) => ({
          value: category.name,
          id: category.id,
        })),
      ],
    },
    name: {
      type: 'input',
      placeholder: 'Название',
    },
  };

  return (
    <div className={styles.tabContainer}>
      <List
        formFields={listFormFields}
        onPageChange={onPageChange}
        pagesCount={Math.ceil(carsCount / CARS_ON_PAGE)}
        page={page}
        onApplyFilters={onApplyFilters}
        defaultFormValues={carsFilters}
        isSubmitting={isSubmitting}
      >
        <Table
          headersData={{
            model: 'Модель',
            category: 'Категория',
            img: 'Изображение',
            colors: 'Цвета',
            number: 'Номер',
            description: 'Описание',
          }}
          rows={cars.map((car) => ({
            model: car.name,
            category: car.categoryId.name,
            img: <CarImgWrapper img={getCarImg(car)} />,
            colors: <ColorsContainer colors={car.colors} />,
            number: car.number,
            description: car.description,
            link: '/admin/edit/car',
            onRowClick: () => {
              dispatch(pickEditingCar(car));
            },
          }))}
        />
      </List>
    </div>
  );
};
export default CarsTab;
