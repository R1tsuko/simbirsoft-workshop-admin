import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import editReducer from './slices/editSlice';
import authReducer from './slices/authSlice';
import mainReducer from './slices/mainSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    auth: authReducer,
    edit: editReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
