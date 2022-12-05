import User from '../../types/User';
import axiosClient from '..';
import { SignupPayload } from './types/SignupPayload';
import { SignupResponse } from './types/SignupResponse';
import { LoginPayload } from './types/LoginPayload';
import { LoginResponse } from './types/LoginResponse';

export const me = () =>
  axiosClient.get<User>('/auth/me', { withCredentials: true }).then((res) => res.data);

export const signUp = (data: SignupPayload) =>
  axiosClient.post<SignupResponse>('/auth/signup', data, {
    withCredentials: true,
  });

export const logIn = (data: LoginPayload) =>
  axiosClient.post<LoginResponse>('/auth/login', data, { withCredentials: true });

export const getUserDetailsFromOauth = (oauthUrl: string) =>
  axiosClient.get<User>(oauthUrl, { withCredentials: true });
