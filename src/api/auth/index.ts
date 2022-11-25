import User from '../../types/User';
import axiosClient from '../api';
import { SignupPayload } from './types/SignupPayload';
import { SignupResponse } from './types/SignupResponse';

export const me = () =>
  axiosClient
    .get<User>('/auth/me', { withCredentials: true })
    .then((res) => res.data);

export const signUp = (data: SignupPayload) =>
  axiosClient.post<SignupResponse>('/auth/signup', data, {
    withCredentials: true,
  });

export const getUserDetailsFromOauth = (oauthUrl: string) =>
  axiosClient.get<User>(oauthUrl, { withCredentials: true });
