import React, { useEffect, useState } from 'react';
import { pointApi } from '../../../../api';
import { getCityName } from '../../../../utils/helpers/commonHelpers';
import { IPointId, ListFormFields } from '../../../../utils/types';
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
          }))}
        />
      </List>
    </div>
  );
};
export default PointsTab;
