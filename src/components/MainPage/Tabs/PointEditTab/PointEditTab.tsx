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
      <Input labelText='Город' id='city' type='text' />

      <Input labelText='Адрес' id='address' type='text' />

      <Input labelText='Название' id='name' type='text' />
    </EditTabOptions>
  </form>
);
export default PointEditTab;
