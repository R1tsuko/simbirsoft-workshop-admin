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

export type ListFormFields = Array<{
  name: string;
  options: Array<ISearchItem>;
}>;

export interface IPointFormData {
  name: string;
  address: string;
  cityId: string;
}
