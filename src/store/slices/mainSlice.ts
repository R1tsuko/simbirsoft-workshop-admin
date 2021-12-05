/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ICarCategoryId,
  ICityId,
  IOrderStatusId,
} from '../../utils/types/entityTypes';
import { carApi, pointApi, orderApi } from '../../api';
import { RootState } from '../store';

export interface IMainState {
  isInitializing: boolean;
  alertMessage: string | null;
  carCategories: Array<ICarCategoryId>;
  cities: Array<ICityId>;
  orderStatuses: Array<IOrderStatusId>;
}

const initialState: IMainState = {
  isInitializing: false,
  alertMessage: null,
  carCategories: [],
  cities: [],
  orderStatuses: [],
};

export const initializeApp = createAsyncThunk(
  'main/initializeApp',
  async () => {
    const [categories, cities, orderStatuses] = await Promise.all([
      carApi.getCategories(),
      pointApi.getCities(),
      orderApi.getOrderStatuses(),
    ]);
    return { categories, cities, orderStatuses };
  }
);

export const mainSlice = createSlice({
  name: 'main',
  initialState,

  reducers: {
    setAlertMessage: (state, action: PayloadAction<string | null>) => {
      state.alertMessage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.isInitializing = true;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.carCategories = action.payload.categories;
        state.cities = action.payload.cities;
        state.orderStatuses = action.payload.orderStatuses
        state.isInitializing = false;
      });
  },
});

export const { setAlertMessage } = mainSlice.actions;

export const selectIsInitializing = (state: RootState) =>
  state.main.isInitializing;
export const selectCarCategories = (state: RootState) =>
  state.main.carCategories;
export const selectAlertMessage = (state: RootState) => state.main.alertMessage;
export const selectCities = (state: RootState) => state.main.cities;
export const selectOrderStatuses = (state: RootState) => state.main.orderStatuses;

export default mainSlice.reducer;
