import React, { useEffect, useState } from 'react';
import { pointApi } from '../../../../api';
import { pickEditingPoint } from '../../../../store/slices/editSlice';
import { useAppDispatch } from '../../../../utils/hooks';
import { getCityName } from '../../../../utils/helpers/commonHelpers';
import { ListFormFields } from '../../../../utils/types/formTypes';
import { IPointId } from '../../../../utils/types/entityTypes';
import List from '../../../ui/List/List';
import Table from '../../../ui/Table/Table';
import styles from './PointsTab.module.scss';

const listFormFields: ListFormFields = [
  {
    name: 'city',
    options: [
      { value: 'Самара', id: '1' },
      { value: 'Ульяновск', id: '2' },
    ],
  },
];

const PointsTab = () => {
  const [points, setPoints] = useState<Array<IPointId>>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    pointApi.getPoints().then((resp) => setPoints(resp.data));
  }, []);

  return (
    <div className={styles.tabContainer}>
      <List formFields={listFormFields}>
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
