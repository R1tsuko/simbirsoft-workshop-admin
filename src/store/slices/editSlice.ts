/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import { ICarId, IPointId } from '../../utils/types/entityTypes';
import { AppDispatch, RootState } from '../store';
import { carApi, pointApi } from '../../api';
import { IPostCarData, IPostPointData } from '../../utils/types/apiTypes';
import { postCarDataToFormData } from '../../utils/helpers/commonHelpers';
import { setAlertMessage } from './mainSlice';

export interface IEditState {
  editingCar: ICarId | null;
  editingPoint: IPointId | null;
  isCarSubmitting: boolean;
  isPointSubmitting: boolean;
}

const initialState: IEditState = {
  editingCar: null,
  editingPoint: null,
  isCarSubmitting: false,
  isPointSubmitting: false,
};

export const saveCar = createAsyncThunk<
  ICarId,
  {
    postCarData: IPostCarData;
    carId?: string;
  },
  { dispatch: AppDispatch }
>('edit/saveCar', async ({ postCarData, carId }, { dispatch }) => {
  const formData = postCarDataToFormData(postCarData);
  const car = await (carId
    ? carApi.updateCar(formData, carId)
    : carApi.postCar(formData));
  dispatch(setAlertMessage('Успех! машина сохранена'));
  return car;
});

export const savePoint = createAsyncThunk<
  IPointId,
  {
    postPointData: IPostPointData;
    pointId?: string;
  },
  { dispatch: AppDispatch }
>('edit/savePoint', async ({ postPointData, pointId }, { dispatch }) => {
  const point = await (pointId
    ? pointApi.updatePoint(postPointData, pointId)
    : pointApi.postPoint(postPointData));
  dispatch(setAlertMessage('Успех! пункт сохранён'));
  return point;
});

export const editSlice = createSlice({
  name: 'edit',
  initialState,

  reducers: {
    pickEditingCar: (state, action: PayloadAction<ICarId | null>) => {
      state.editingCar = action.payload;
    },
    pickEditingPoint: (state, action: PayloadAction<IPointId | null>) => {
      state.editingPoint = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveCar.pending, (state) => {
        state.isCarSubmitting = true;
      })
      .addCase(saveCar.fulfilled, (state, action) => {
        state.isCarSubmitting = false;
        state.editingCar = action.payload;
      })
      .addCase(savePoint.pending, (state) => {
        state.isPointSubmitting = true;
      })
      .addCase(savePoint.fulfilled, (state, action) => {
        state.isPointSubmitting = false;
        state.editingPoint = action.payload;
      });
  },
});

export const { pickEditingCar, pickEditingPoint } = editSlice.actions;

const deleteEntity = <T>(
  thunkName: string,
  deleteMethod: (id: string) => Promise<void>,
  alertMessage: string,
  pickActionCreator: ActionCreatorWithPayload<T | null>
) =>
  createAsyncThunk<void, string, { dispatch: AppDispatch }>(
    thunkName,
    async (id, { dispatch }) => {
      await deleteMethod(id);
      dispatch(setAlertMessage(alertMessage));
      dispatch(pickActionCreator(null));
    }
  );

export const deletePoint = deleteEntity(
  'edit/deletePoint',
  pointApi.deletePoint,
  'Успех! пункт удалён',
  pickEditingPoint
);

export const deleteCar = deleteEntity(
  'edit/deleteCar',
  carApi.deleteCar,
  'Успех! машина удалёна',
  pickEditingCar
);

export const selectEditingCar = (state: RootState) => state.edit.editingCar;
export const selectEditingPoint = (state: RootState) => state.edit.editingPoint;
export const selectIsCarSubmitting = (state: RootState) =>
  state.edit.isCarSubmitting;
export const selectIsPointSubmitting = (state: RootState) =>
  state.edit.isPointSubmitting;

export default editSlice.reducer;
