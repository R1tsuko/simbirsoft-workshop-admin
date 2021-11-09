export interface ILoginData {
  username: string;
  password: string;
}

export interface ITokensInfo {
  expireDate: number;
  refreshToken: string;
  authToken: string;
}

export interface ILoginResponseData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: 'bearer';
  user_id: string;
}
