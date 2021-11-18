import classNames from 'classnames';
import { format } from 'date-fns';
import React from 'react';
import { DATE_FORMAT } from '../../../../../utils/constants';
import Checkbox from '../../../../ui/Checkbox/Checkbox';
import styles from './OrderListItem.module.scss';
import checkIcon from '../../../../../assets/icons/CheckIcon.svg';
import editIcon from '../../../../../assets/icons/EditIcon.svg';
import rejectIcon from '../../../../../assets/icons/RejectIcon.svg';

interface IOrderListItemProps {
  carName: string;
  carImg: string;
  address: string;
  cityName: string;
  color: string;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
  price: number;
  dateFrom: number;
  dateTo: number;
}

const OrderListItem: React.FC<IOrderListItemProps> = ({
  carName,
  carImg,
  cityName,
  address,
  color,
  isFullTank,
  isNeedChildChair,
  isRightWheel,
  price,
  dateFrom,
  dateTo,
}) => (
  <div className={styles.itemContainer}>
    <div className={styles.carImgWrapper}>
      <img src={carImg} className={styles.carImg} alt='car' />
    </div>
    <div className={styles.infoWrapper}>
      <div className={styles.info}>
        <div className={styles.row}>
          <span className={styles.highlighted}>{carName}</span> в{' '}
          <span className={styles.highlighted}>{cityName},</span>{' '}
          <div className={styles.address}>{address}</div>
        </div>
        <div className={styles.row}>
          {format(dateFrom, DATE_FORMAT)} — {format(dateTo, DATE_FORMAT)}
        </div>
        <div className={styles.row}>
          Цвет: <span className={styles.highlighted}>{color}</span>
        </div>
      </div>
    </div>
    <div className={styles.options}>
      <Checkbox labelText='Полный бак' checked={isFullTank} disabled />
      <Checkbox labelText='Детское кресло' checked={isNeedChildChair} disabled />
      <Checkbox labelText='Правый руль' checked={isRightWheel} disabled />
    </div>
    <div className={styles.price}>{price} ₽</div>
    <div className={styles.controls}>
      <button className={classNames(styles.control, styles.leftControl)} type='button'><img src={checkIcon} alt='check' /> Готово</button>
      <button className={classNames(styles.control, styles.centerControl)} type='button'><img src={editIcon} alt='edit' /> Изменить</button>
      <button className={classNames(styles.control, styles.rightControl)} type='button'><img src={rejectIcon} alt='reject' /> Удалить</button>
    </div>
  </div>
);

export default OrderListItem;
