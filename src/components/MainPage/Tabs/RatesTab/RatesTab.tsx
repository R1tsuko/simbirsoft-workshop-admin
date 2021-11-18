import React, { useEffect, useState } from 'react';
import {  rateApi } from '../../../../api';
import {  IRateId, ListFormFields } from '../../../../utils/types';
import List from '../../../ui/List/List';
import Table from '../../../ui/Table/Table';
import styles from './RatesTab.module.scss';

const listFormFields: ListFormFields = [
  {
    name: 'unit',
    options: [
      { value: 'мин', id: '1' },
      { value: 'сутки', id: '2' },
    ],
  },
];

const RatesTab = () => {
  const [rates, setRates] = useState<Array<IRateId>>([]);

  useEffect(() => {
    rateApi.getRates  ().then((resp) => setRates(resp.data));
  }, []);

  return (
    <div className={styles.tabContainer}>
      <List formFields={listFormFields}>
        <Table
          headersData={{ name: 'Название', unit: 'Ед. изм', price: 'Цена за ед. изм' }}
          rows={rates.map((rate) => ({
            name: rate.rateTypeId.name,
            unit: rate.rateTypeId.unit,
            price: rate.price,
          }))}
        />
      </List>
    </div>
  );
};
export default RatesTab;
