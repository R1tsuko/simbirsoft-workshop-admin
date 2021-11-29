import { IPointFormData } from './formTypes';
import { ICityId, ICarId, IOrderStatusId, IPointId } from './entityTypes';

export interface IArrayResponseData<T> {
  count: number;
  data: Array<T>;
}

export interface IPostCarData {
  priceMax: number;
  priceMin: number;
  name: string;
  description: string;
  categoryId: { id: string };
  colors: Array<string>;
  thumbnail: File;
  tank: number;
}

export type IPostPointData = IPointFormData;

export interface ILoginResponseData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: 'bearer';
  user_id: string;
}

export interface IOrdersResponseData {
  cityId: ICityId | null;
  pointId: IPointId | null;
  orderStatusId: IOrderStatusId | null;
  carId: ICarId | null;
  color: string;
  dateFrom: number;
  dateTo: number;
  price: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
  id: string;
}
