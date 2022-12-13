import User from '../../types/User';
import axiosClient from '..';
import { SignupRequestDto } from './dto/Request/SignupRequest.dto';
import { SignupResponseDto } from './dto/Response/SignupResponse.dto';
import { LoginRequestDto } from './dto/Request/LoginRequest.dto';
import { LoginResponseDto } from './dto/Response/LoginResponse.dto';
import { LogoutResponseDto } from './dto/Response/LogoutResponse.dto';

export const me = () =>
  axiosClient.get<User>('/auth/me', { withCredentials: true }).then((res) => res.data);

export const signUp = (data: SignupRequestDto) =>
  axiosClient.post<SignupResponseDto>('/auth/signup', data, {
    withCredentials: true,
  });

export const logIn = (data: LoginRequestDto) =>
  axiosClient.post<LoginResponseDto>('/auth/login', data, { withCredentials: true });

export const getUserDetailsFromOauth = (oauthUrl: string) =>
  axiosClient.get<User>(oauthUrl, { withCredentials: true });

export const logOut = () =>
  axiosClient.get<LogoutResponseDto>('/auth/logout', { withCredentials: true });
