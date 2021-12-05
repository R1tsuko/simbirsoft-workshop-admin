import React, { useEffect } from 'react';
import { startOfDay, startOfWeek } from 'date-fns/esm';
import {
  IOrdersListFormData,
  ListFormFields,
} from '../../../../utils/types/formTypes';
import OrderListItem from './OrdersListItem/OrderListItem';
import {
  getCarImg,
  getCarName,
  getCityName,
  getColorName,
  getPointAddress,
} from '../../../../utils/helpers/commonHelpers';
import {
  getOrders,
  selectIsOrdersSubmitting,
  selectOrdersCount,
  selectOrdersFilters,
  selectOrdersPage,
  selectOrdersToShow,
  setOrdersFiltersAndPage,
} from '../../../../store/slices/listSlice';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import {
  DEFAULT_LIST_FORM_ITEM_ID,
  ORDERS_ON_PAGE,
} from '../../../../utils/constants';
import {
  selectCities,
  selectOrderStatuses,
} from '../../../../store/slices/mainSlice';
import List from '../../../ui/List/List';
import styles from './OrdersTab.module.scss';

const OrdersTab = () => {
  const orders = useAppSelector(selectOrdersToShow);
  const ordersFilters = useAppSelector(selectOrdersFilters);
  const ordersCount = useAppSelector(selectOrdersCount);
  const page = useAppSelector(selectOrdersPage);
  const cities = useAppSelector(selectCities);
  const orderStatuses = useAppSelector(selectOrderStatuses);
  const isSubmitting = useAppSelector(selectIsOrdersSubmitting);
  const dispatch = useAppDispatch();

  const onPageChange = (newPage: number) => {
    dispatch(
      setOrdersFiltersAndPage({ formData: ordersFilters, page: newPage })
    );
  };

  const onApplyFilters = (formData: IOrdersListFormData) => {
    dispatch(setOrdersFiltersAndPage({ formData, page: 0 }));
  };

  useEffect(() => {
    dispatch(getOrders({ page, listFormData: ordersFilters }));
  }, [page, ordersFilters]);

  const listFormFields: ListFormFields<IOrdersListFormData> = {
    dateFrom: {
      type: 'select',
      options: [
        { value: 'За всё время', id: DEFAULT_LIST_FORM_ITEM_ID },
        { value: 'За неделю', id: startOfDay(new Date()).getTime().toString() },
        { value: 'За месяц', id: startOfWeek(new Date()).getTime().toString() },
      ],
    },
    orderStatusId: {
      type: 'select',
      options: [
        { value: 'Все статусы', id: DEFAULT_LIST_FORM_ITEM_ID },
        ...orderStatuses.map((status) => ({
          value: status.name,
          id: status.id,
        })),
      ],
    },
    cityId: {
      type: 'select',
      options: [
        { value: 'Любой город', id: DEFAULT_LIST_FORM_ITEM_ID },
        ...cities.map((city) => ({ value: city.name, id: city.id })),
      ],
    },
  };

  return (
    <div className={styles.tabContainer}>
      <List
        formFields={listFormFields}
        onPageChange={onPageChange}
        pagesCount={Math.ceil(ordersCount / ORDERS_ON_PAGE)}
        page={page}
        onApplyFilters={onApplyFilters}
        defaultFormValues={ordersFilters}
        isSubmitting={isSubmitting}
      >
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
            id,
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
              key={id}
            />
          )
        )}
      </List>
    </div>
  );
};

export default OrdersTab;
