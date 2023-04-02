import { User } from 'models';
import { axios, Response } from 'utils/axios';

export const apiProfile = {
  update: (body: { name: string }) =>
    axios.put<Response<User>>(`/profile`, body),
};
