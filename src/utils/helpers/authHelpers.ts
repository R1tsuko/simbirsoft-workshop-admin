import { APP_SECRET, TOKENS_DETAILS_NAME } from '../constants';
import { ITokensInfo } from '../types';

export const getRandomHash = (len: number): string => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < len; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateBasicToken = (len: number): string =>
  btoa(`${getRandomHash(len)}:${APP_SECRET}`);

export const saveTokensInLocalStorage = (
  expiresIn: number,
  refreshToken: string,
  authToken: string
): void => {
  const tokensInfo: ITokensInfo = {
    expireDate: new Date().getTime() + expiresIn * 1000,
    refreshToken,
    authToken,
  };
  localStorage.setItem(TOKENS_DETAILS_NAME, JSON.stringify(tokensInfo));
};

export const getTokensFromLocalStorage = (): {
  authToken: string;
  refreshToken: string;
} | null => {
  const tokenDetailsString = localStorage.getItem(TOKENS_DETAILS_NAME);

  if (!tokenDetailsString) {
    return null;
  }

  const { expireDate, authToken, refreshToken }: ITokensInfo =
    JSON.parse(tokenDetailsString);
  if (expireDate < new Date().getTime()) {
    return null;
  }

  return { authToken, refreshToken };
};

export const clearTokensInLocalStorage = (): void => {
  localStorage.removeItem(TOKENS_DETAILS_NAME);
};
