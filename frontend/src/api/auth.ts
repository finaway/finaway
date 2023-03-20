import { User } from 'models/User';
import { axios, Response } from 'utils/axios';

export const apiAuth = {
  login: (payload: { email: string; password: string }) => {
    return axios.post<Response<{ user: User; token: string }>>(
      '/auth/login',
      payload,
    );
  },
  register: (payload: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    return axios.post<Response<{ user: User; token: string }>>(
      '/auth/register',
      payload,
    );
  },
};
