import React from 'react';
import Input from '../../../ui/Input/Input';
import EditTabOptions from '../../../ui/EditTabOptions/EditTabOptions';
import EditTabCard from '../../../ui/EditTabCard/EditTabCard';
import styles from './PointEditTab.module.scss';

const PointEditTab = () => (
  <form className={styles.tabContainer}>
    <EditTabCard
      title='Название пункта'
      subtitle='Казань, ул. Чернышевского, д. 88'
    />

    <EditTabOptions title='Настройки пункта'>
      <Input labelText='Город' id='city' type='text' blackText />

      <Input labelText='Адрес' id='address' type='text' blackText />

      <Input labelText='Название' id='name' type='text' blackText />
    </EditTabOptions>
  </form>
);
export default PointEditTab;
