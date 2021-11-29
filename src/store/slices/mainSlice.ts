/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICarCategoryId, ICityId } from '../../utils/types/entityTypes';
import { carApi, pointApi } from '../../api';
import { RootState } from '../store';

export interface IMainState {
  isInitializing: boolean;
  alertMessage: string | null;
  carCategories: Array<ICarCategoryId>;
  cities: Array<ICityId>;
}

const initialState: IMainState = {
  isInitializing: false,
  alertMessage: null,
  carCategories: [],
  cities: [],
};

export const initializeApp = createAsyncThunk(
  'main/initializeApp',
  async () => {
    const [categories, cities] = await Promise.all([
      carApi.getCategories(),
      pointApi.getCities(),
    ]);
    return { categories, cities };
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

export default mainSlice.reducer;
