import axios from 'axios';
import { APP_ID, API_URL } from './utils/constants';
import { ILoginData, ILoginResponseData, IResponseData, IOrdersResponseData, IPointId, ICarId, IRateId } from './utils/types';

const instance = axios.create({
  baseURL: API_URL,
  headers: { 'X-Api-Factory-Application-Id': APP_ID },
});

export const authApi = {
  accessTokenInterceptor: null as null | number,

  async login({ username, password }: ILoginData, authToken: string) {
    const response = await instance.post<ILoginResponseData>(
      `auth/login`,
      { username, password },
      {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      }
    );

    return response.data;
  },

  async refresh(refreshToken: string, authToken: string) {
    const response = await instance.post<ILoginResponseData>(
      `auth/refresh`,
      { refresh_token: refreshToken },
      {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      }
    );

    return response.data;
  },

  async check() {
    const response = await instance.get('auth/check');
    return response.data;
  },

  async logout() {
    const response = await instance.post('auth/logout');
    return response.data;
  },

  injectAccessToken(accessToken: string) {
    this.accessTokenInterceptor = instance.interceptors.request.use(
      (config) => ({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      })
    );
  },

  ejectAccessToken() {
    if (this.accessTokenInterceptor !== null) {
      instance.interceptors.request.eject(this.accessTokenInterceptor);
    }
  },
};

export const orderApi = {
  async getOrders() {
    const response = await instance.get<IResponseData<IOrdersResponseData>>('db/order/?limit=5&page=0');
    return response.data;
  },
}

export const pointApi = {
  async getPoints() {
    const response = await instance.get<IResponseData<IPointId>>('db/point');
    return response.data;
  },
}

export const carApi = {
  async getCars() {
    const response = await instance.get<IResponseData<ICarId>>('db/car?limit=5&page=0');
    return response.data;
  },
}

export const rateApi = {
  async getRates() {
    const response = await instance.get<IResponseData<IRateId>>('db/rate');
    return response.data;
  },
}