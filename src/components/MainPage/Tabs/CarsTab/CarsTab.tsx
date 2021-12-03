import React, { useEffect, useState } from 'react';
import { carApi } from '../../../../api';
import { pickEditingCar } from '../../../../store/slices/editSlice';
import { getCarImg } from '../../../../utils/helpers/commonHelpers';
import { useAppDispatch } from '../../../../utils/hooks';
import { ICarId } from '../../../../utils/types/entityTypes';
import { ListFormFields } from '../../../../utils/types/formTypes';
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

const listFormFields: ListFormFields = [
  {
    name: 'color',
    options: [
      { value: 'Любой', id: '1' },
      { value: 'Красный', id: '2' },
    ],
  },
  {
    name: 'category',
    options: [
      { value: 'Люкс', id: '1' },
      { value: 'Спорт', id: '2' },
    ],
  },
];

const CarsTab = () => {
  const [cars, setCars] = useState<Array<ICarId>>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    carApi.getCars().then((resp) => setCars(resp.data));
  }, []);

  return (
    <div className={styles.tabContainer}>
      <List formFields={listFormFields}>
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
