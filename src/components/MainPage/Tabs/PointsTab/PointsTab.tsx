import React, { useEffect } from 'react';
import { pickEditingPoint } from '../../../../store/slices/editSlice';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import { getCityName } from '../../../../utils/helpers/commonHelpers';
import {
  getPoints,
  selectIsPointsSubmitting,
  selectPointsCount,
  selectPointsFilters,
  selectPointsPage,
  selectPointsToShow,
  setPointsFiltersAndPage,
} from '../../../../store/slices/listSlice';
import { DEFAULT_LIST_FORM_ITEM_ID, POINTS_ON_PAGE } from '../../../../utils/constants';
import { selectCities } from '../../../../store/slices/mainSlice';
import { IPointsListFormData, ListFormFields } from '../../../../utils/types/formTypes';
import List from '../../../ui/List/List';
import Table from '../../../ui/Table/Table';
import styles from './PointsTab.module.scss';

const PointsTab = () => {
  const points = useAppSelector(selectPointsToShow);
  const pointsFilters = useAppSelector(selectPointsFilters);
  const pointsCount = useAppSelector(selectPointsCount);
  const page = useAppSelector(selectPointsPage);
  const cities = useAppSelector(selectCities);
  const isSubmitting = useAppSelector(selectIsPointsSubmitting);
  const dispatch = useAppDispatch();

  const onPageChange = (newPage: number) => {
    dispatch(
      setPointsFiltersAndPage({ formData: pointsFilters, page: newPage })
    );
  };

  const onApplyFilters = (formData: IPointsListFormData) => {
    dispatch(setPointsFiltersAndPage({ formData, page: 0 }));
  };

  useEffect(() => {
    dispatch(getPoints({ page, listFormData: pointsFilters }));
  }, [page, pointsFilters]);

  const listFormFields: ListFormFields<IPointsListFormData> = {
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
        pagesCount={Math.ceil(pointsCount / POINTS_ON_PAGE)}
        page={page}
        onApplyFilters={onApplyFilters}
        defaultFormValues={pointsFilters}
        isSubmitting={isSubmitting}
      >
        <Table
          headersData={{ name: 'Название', city: 'Город', address: 'Адрес' }}
          rows={points.map((point) => ({
            name: point.name,
            city: getCityName(point.cityId),
            address: point.address,
            link: '/admin/edit/point',
            onRowClick: () => {
              dispatch(pickEditingPoint(point));
            },
          }))}
        />
      </List>
    </div>
  );
};
export default PointsTab;
