import axios, { AxiosInstance } from 'axios';
import { APP_ID, BASE_URL } from '../utils/constants/authConstants';
import { ILoginData, ILoginResponseData } from '../utils/types';

class AuthApi {
  private accessTokenInterceptor: null | number;

  private instance: AxiosInstance;

  constructor() {
    this.accessTokenInterceptor = null;
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: { 'X-Api-Factory-Application-Id': APP_ID },
    });
  }

  async login({ username, password }: ILoginData, authToken: string) {
    const response = await this.instance.post<ILoginResponseData>(
      `auth/login`,
      { username, password },
      {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      }
    );

    return response.data;
  }

  async refresh(refreshToken: string, authToken: string) {
    const response = await this.instance.post<ILoginResponseData>(
      `auth/refresh`,
      { refresh_token: refreshToken },
      {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      }
    );

    return response.data;
  }

  async check() {
    const response = await this.instance.get('auth/check');
    return response.data;
  }

  async logout() {
    const response = await this.instance.post('auth/logout');
    return response.data;
  }

  injectAccessToken(accessToken: string) {
    this.accessTokenInterceptor = this.instance.interceptors.request.use(
      (config) => ({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      })
    );
  }

  ejectAccessToken() {
    if (this.accessTokenInterceptor) {
      axios.interceptors.request.eject(this.accessTokenInterceptor);
    }
  }
}

const authApi = new AuthApi();

export default authApi;
