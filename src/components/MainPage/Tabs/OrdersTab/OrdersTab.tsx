import React, { useEffect, useState } from 'react';
import { orderApi } from '../../../../api';
import { IOrdersResponseData, ListFormFields } from '../../../../utils/types';
import List from '../../../ui/List/List';
import OrderListItem from './OrdersListItem/OrderListItem';
import {
  getCarImg,
  getCarName,
  getCityName,
  getColorName,
  getPointAddress,
} from '../../../../utils/helpers/commonHelpers';
import styles from './OrdersTab.module.scss';

const listFormFields: ListFormFields = [
  {
    name: 'period',
    options: [
      { value: 'За неделю', id: '1' },
      { value: 'За месяц', id: '2' },
    ],
  },
  {
    name: 'car',
    options: [
      { value: 'Elantra', id: '1' },
      { value: 'aaa', id: '2' },
    ],
  },
  {
    name: 'city',
    options: [
      { value: 'Ульяновск', id: '1' },
      { value: 'Самара', id: '2' },
    ],
  },
  {
    name: 'status',
    options: [
      { value: 'В процессе', id: '1' },
      { value: 'Отмененные', id: '2' },
    ],
  },
];

const OrdersTab = () => {
  const [orders, setOrders] = useState<Array<IOrdersResponseData>>([]);
  useEffect(() => {
    orderApi.getOrders().then((resp) => setOrders(resp.data));
  }, []);

  return (
    <div className={styles.tabContainer}>
      <List formFields={listFormFields}>
        {orders.map(
          ({
            cityId,
            pointId,
            carId,
            color,
            isFullTank,
            isNeedChildChair,
            isRightWheel,
            price,
            dateFrom,
            dateTo,
          }) => (
            <OrderListItem
              carName={getCarName(carId)}
              carImg={getCarImg(carId)}
              address={getPointAddress(pointId)}
              cityName={getCityName(cityId)}
              color={getColorName(color)}
              isFullTank={isFullTank}
              isNeedChildChair={isNeedChildChair}
              isRightWheel={isRightWheel}
              price={price}
              dateFrom={dateFrom}
              dateTo={dateTo}
            />
          )
        )}
      </List>
    </div>
  );
};

export default OrdersTab;
