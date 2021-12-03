import axios from 'axios';
import { APP_ID, API_URL } from './utils/constants';
import { ILoginData } from './utils/types/formTypes';
import {
  IPointId,
  ICarId,
  IRateId,
  ICarCategoryId,
  ICityId,
} from './utils/types/entityTypes';
import {
  ILoginResponseData,
  IArrayResponseData,
  IOrdersResponseData,
  IPostPointData,
} from './utils/types/apiTypes';

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
    const response = await instance.get<
      IArrayResponseData<IOrdersResponseData>
    >('db/order/?limit=5&page=0');
    return response.data;
  },
};

export const pointApi = {
  async getPoints() {
    const response = await instance.get<IArrayResponseData<IPointId>>(
      'db/point'
    );
    return response.data;
  },
  async getCities() {
    const response = await instance.get<IArrayResponseData<ICityId>>('db/city');
    return response.data.data;
  },
  async postPoint(postPointData: IPostPointData) {
    const response = await instance.post<{ data: IPointId }>(
      'db/point',
      postPointData
    );
    return response.data.data;
  },
  async updatePoint(postPointData: IPostPointData, pointId: string) {
    const response = await instance.put<{ data: IPointId }>(
      `db/point/${pointId}`,
      postPointData
    );
    return response.data.data;
  },
  async deletePoint(pointId: string) {
    await instance.delete(`db/point/${pointId}`);
  },
};

export const carApi = {
  async getCars() {
    const response = await instance.get<IArrayResponseData<ICarId>>(
      'db/car?limit=5&page=0'
    );
    return response.data;
  },
  async getCategories() {
    const response = await instance.get<IArrayResponseData<ICarCategoryId>>(
      'db/category'
    );
    return response.data.data;
  },
  async postCar(postCarData: FormData) {
    const response = await instance.post<{ data: ICarId }>(
      'db/car',
      postCarData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },
  async updateCar(postCarData: FormData, carId: string) {
    const response = await instance.put<{ data: ICarId }>(
      `db/car/${carId}`,
      postCarData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },
  async deleteCar(carId: string) {
    await instance.delete(`db/car/${carId}`);
  },
};

export const rateApi = {
  async getRates() {
    const response = await instance.get<IArrayResponseData<IRateId>>('db/rate');
    return response.data;
  },
};
