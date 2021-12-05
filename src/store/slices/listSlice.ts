/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { orderApi, carApi, pointApi } from '../../api';
import { RootState } from '../store';
import {
  ordersListFormDataToURLParams,
  carsListFormDataToURLParams,
  pointsListFormDataToURLParams,
} from '../../utils/helpers/commonHelpers';
import { IOrderId, ICarId, IPointId } from '../../utils/types/entityTypes';
import {
  IOrdersListFormData,
  ICarsListFormData,
  IPointsListFormData,
} from '../../utils/types/formTypes';
import {
  ORDERS_ON_PAGE,
  DEFAULT_LIST_FORM_ITEM_ID,
  CARS_ON_PAGE,
  POINTS_ON_PAGE,
} from '../../utils/constants';

export interface IListState {
  ordersPage: number;
  ordersCount: number;
  ordersToShow: Array<IOrderId>;
  ordersFilters: IOrdersListFormData;
  isOrdersSubmitting: boolean;

  carsPage: number;
  carsCount: number;
  carsToShow: Array<ICarId>;
  carsFilters: ICarsListFormData;
  isCarsSubmitting: boolean;

  pointsPage: number;
  pointsCount: number;
  pointsToShow: Array<IPointId>;
  pointsFilters: IPointsListFormData;
  isPointsSubmitting: boolean;
}

const initialState: IListState = {
  ordersPage: 0,
  ordersCount: 1,
  ordersToShow: [],
  ordersFilters: {
    cityId: DEFAULT_LIST_FORM_ITEM_ID,
    orderStatusId: DEFAULT_LIST_FORM_ITEM_ID,
    dateFrom: DEFAULT_LIST_FORM_ITEM_ID,
  },
  isOrdersSubmitting: false,

  carsPage: 0,
  carsCount: 1,
  carsToShow: [],
  carsFilters: {
    categoryId: DEFAULT_LIST_FORM_ITEM_ID,
    name: DEFAULT_LIST_FORM_ITEM_ID,
  },
  isCarsSubmitting: false,

  pointsPage: 0,
  pointsCount: 1,
  pointsToShow: [],
  pointsFilters: {
    cityId: DEFAULT_LIST_FORM_ITEM_ID,
  },
  isPointsSubmitting: false,
};

function getEntitiesByFilters<T, K>(
  thunkName: string,
  mapFiltersToParams: (listFormData: T) => URLSearchParams,
  getMethod: (params: URLSearchParams) => Promise<K>,
  paginationLimit: number
) {
  return createAsyncThunk(
    `list/${thunkName}`,
    async ({ page, listFormData }: { page: number; listFormData: T }) => {
      const params = mapFiltersToParams(listFormData);
      params.append('page', page.toString());
      params.append('limit', paginationLimit.toString());

      const response = await getMethod(params);
      return response;
    }
  );
}

export const getOrders = getEntitiesByFilters(
  'getOrders',
  ordersListFormDataToURLParams,
  orderApi.getOrders,
  ORDERS_ON_PAGE
);

export const getCars = getEntitiesByFilters(
  'getCars',
  carsListFormDataToURLParams,
  carApi.getCars,
  CARS_ON_PAGE
);

export const getPoints = getEntitiesByFilters(
  'getPoints',
  pointsListFormDataToURLParams,
  pointApi.getPoints,
  POINTS_ON_PAGE
);

export const listSlice = createSlice({
  name: 'list',
  initialState,

  reducers: {
    setOrdersFiltersAndPage: (
      state,
      action: PayloadAction<{ formData: IOrdersListFormData; page: number }>
    ) => {
      state.ordersFilters = action.payload.formData;
      state.ordersPage = action.payload.page;
    },
    setCarsFiltersAndPage: (
      state,
      action: PayloadAction<{ formData: ICarsListFormData; page: number }>
    ) => {
      state.carsFilters = action.payload.formData;
      state.carsPage = action.payload.page;
    },
    setPointsFiltersAndPage: (
      state,
      action: PayloadAction<{ formData: IPointsListFormData; page: number }>
    ) => {
      state.pointsFilters = action.payload.formData;
      state.pointsPage = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.ordersToShow = action.payload.data;
        state.ordersCount = action.payload.count;
        state.isOrdersSubmitting = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isOrdersSubmitting = true;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.carsToShow = action.payload.data;
        state.carsCount = action.payload.count;
        state.isCarsSubmitting = false;
      })
      .addCase(getCars.pending, (state) => {
        state.isCarsSubmitting = true;
      })
      .addCase(getPoints.fulfilled, (state, action) => {
        state.pointsToShow = action.payload.data;
        state.pointsCount = action.payload.count;
        state.isPointsSubmitting = false;
      })
      .addCase(getPoints.pending, (state) => {
        state.isPointsSubmitting = true;
      });
  },
});

export const {
  setOrdersFiltersAndPage,
  setCarsFiltersAndPage,
  setPointsFiltersAndPage,
} = listSlice.actions;

export const selectOrdersPage = (state: RootState) => state.list.ordersPage;
export const selectOrdersCount = (state: RootState) => state.list.ordersCount;
export const selectOrdersFilters = (state: RootState) =>
  state.list.ordersFilters;
export const selectOrdersToShow = (state: RootState) => state.list.ordersToShow;
export const selectIsOrdersSubmitting = (state: RootState) =>
  state.list.isOrdersSubmitting;

export const selectCarsPage = (state: RootState) => state.list.carsPage;
export const selectCarsCount = (state: RootState) => state.list.carsCount;
export const selectCarsFilters = (state: RootState) => state.list.carsFilters;
export const selectCarsToShow = (state: RootState) => state.list.carsToShow;
export const selectIsCarsSubmitting = (state: RootState) =>
  state.list.isCarsSubmitting;

export const selectPointsPage = (state: RootState) => state.list.pointsPage;
export const selectPointsCount = (state: RootState) => state.list.pointsCount;
export const selectPointsFilters = (state: RootState) => state.list.pointsFilters;
export const selectPointsToShow = (state: RootState) => state.list.pointsToShow;
export const selectIsPointsSubmitting = (state: RootState) =>
  state.list.isPointsSubmitting;

export default listSlice.reducer;
