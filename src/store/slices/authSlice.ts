/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  generateBasicToken,
  getTokensFromLocalStorage,
  saveTokensInLocalStorage,
  clearTokensInLocalStorage,
} from '../../utils/helpers/authHelpers';
import { authApi } from '../../api';
import { ILoginData, ILoginResponseData } from '../../utils/types';
import { RootState, AppDispatch } from '../store';

export interface IAuthState {
  isLoggedIn: boolean;
  isLoginError: boolean;
  isSubmitting: boolean;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  isLoginError: false,
  isSubmitting: false,
};

export const login = createAsyncThunk<
  void,
  ILoginData,
  { dispatch: AppDispatch }
>('auth/login', async (loginData, { dispatch }) => {
  try {
    const authToken = generateBasicToken(15);
    const response = await authApi.login(loginData, authToken);
    onLoginSuccess(response, dispatch, authToken);
  } catch (e) {
    if (e.response.status === 401) {
      dispatch(loginFail());
    }
  }
});

export const tryAutoLogin = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>('auth/tryAutoLogin', async (_, { dispatch }) => {
  const tokensInfo = getTokensFromLocalStorage();

  if (tokensInfo) {
    const response = await authApi.refresh(
      tokensInfo.refreshToken,
      tokensInfo.authToken
    );
    onLoginSuccess(response, dispatch, tokensInfo.authToken);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authApi.logout();
  authApi.ejectAccessToken();
  clearTokensInLocalStorage();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.isLoginError = false;
    },
    loginFail: (state) => {
      state.isLoginError = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(tryAutoLogin.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(tryAutoLogin.fulfilled, (state) => {
        state.isSubmitting = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
      });
  },
});

const { loginSuccess, loginFail } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLoginError = (state: RootState) => state.auth.isLoginError;
export const selectIsSubmitting = (state: RootState) => state.auth.isSubmitting;

const onLoginSuccess = (
  response: ILoginResponseData,
  dispatch: AppDispatch,
  authToken: string
) => {
  authApi.injectAccessToken(response.access_token);
  saveTokensInLocalStorage(
    response.expires_in,
    response.refresh_token,
    authToken
  );
  dispatch(loginSuccess());
};

export default authSlice.reducer;
