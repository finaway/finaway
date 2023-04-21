import { User } from 'models';
import { axios, Response } from 'utils/axios';

export const apiProfile = {
  update: (body: { name: string }) =>
    axios.put<Response<User>>(`/profile`, body),
  updatePassword: (body: {
    old_password: string;
    password: string;
    password_confirmation: string;
  }) => axios.put<Response<User>>(`/profile/password`, body),
};
