import React from 'react';
import Input from '../../../ui/Input/Input';
import EditTabOptions from '../../../ui/EditTabOptions/EditTabOptions';
import EditTabCard from '../../../ui/EditTabCard/EditTabCard';
import styles from './RateEditTab.module.scss';

const RateEditTab = () => (
  <form className={styles.tabContainer}>
    <EditTabCard title='Название тарифа' subtitle='1234 ₽/мин' />

    <EditTabOptions title='Настройки тарифа'>
      <Input labelText='Ед. изм' id='unit' type='text' blackText />

      <Input labelText='Цена за ед. изм' id='price' type='text' blackText />

      <Input labelText='Название' id='name' type='text' blackText />
    </EditTabOptions>
  </form>
);
export default RateEditTab;
