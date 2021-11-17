import { BASE_URL } from '../constants';
import { ICarId, ICityId, IPointId } from '../types';
import defaultCar from '../../assets/images/DefaultCar.jpg';

export const getCarName = (carId: ICarId | null | undefined) =>
  carId?.name || 'Модель не найдена';

export const getCarImg = (carId: ICarId | null | undefined) =>
  (carId?.thumbnail.path[0] === '/'
    ? BASE_URL + carId?.thumbnail.path
    : carId?.thumbnail.path) || defaultCar;

export const getPointAddress = (pointId: IPointId | null | undefined) =>
  pointId?.address || 'Адрес не найден';

export const getCityName = (cityId: ICityId | null | undefined) =>
  cityId?.name || 'Город не найден';

export const getColorName = (color: string | null | undefined) =>
  // prettier-ignore
  (color && (color.charAt(0).toUpperCase() + color.slice(1))) || 'Любой';
