export interface ICarCategoryId {
  name: string;
  description: string;
  id: string;
}

export interface ICarId {
  priceMax: number;
  priceMin: number;
  name: string;
  number: string;
  thumbnail: {
    path: string;
  };
  categoryId: {
    name: string;
    description: string;
    id: string;
  };
  description: string;
  tank: number;
  colors: Array<string>;
  id: string;
}

export interface ICityId {
  id: string;
  name: string;
}

export interface IRateTypeId {
  id: string;
  name: string;
  unit: string;
}

export interface IRateId {
  id: string;
  price: number;
  rateTypeId: IRateTypeId;
}

export interface IPointId {
  address: string;
  id: string;
  name: string;
  cityId: ICityId | undefined;
}

export interface IOrderId {
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

export interface IOrderStatusId {
  id: string;
  name: string;
}
