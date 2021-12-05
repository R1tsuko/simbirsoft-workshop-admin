import { DEFAULT_LIST_FORM_ITEM_ID } from '../constants';
import { ISearchItem } from './commonTypes';

export interface ICarFormData {
  name: string;
  categoryId: string;
  description: string;
  imageFileList: FileList;
  colors: Array<{ name: string }>;
  priceMin: number;
  priceMax: number;
  tank: number;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IOrdersListFormData {
  cityId: string;
  orderStatusId: string;
  dateFrom: number | typeof DEFAULT_LIST_FORM_ITEM_ID;
}

export interface ICarsListFormData {
  categoryId: string;
  name: string | typeof DEFAULT_LIST_FORM_ITEM_ID;
}

export interface IPointsListFormData {
  cityId: string;
}

export type ListFormFields<T> = Record<
  keyof T,
  | { type: 'input'; placeholder: string }
  | { type: 'select'; options: Array<ISearchItem> }
>;

export interface IPointFormData {
  name: string;
  address: string;
  cityId: string;
}
