import { Expense } from './../models/Expense';
import { axios, Response } from 'utils/axios';

export const apiExpense = {
  getAll: () => axios.get<Response<Expense[]>>('/expenses'),
  find: (id: number) => axios.get<Response<Expense>>(`/expenses/${id}`),
  create: (body: Expense) => axios.post<Response<Expense>>('/expenses', body),
  update: (id: number, body: Expense) =>
    axios.put<Response<Expense>>(`/expenses/${id}`, body),
  delete: (id: number) => axios.delete<Response<Expense>>(`/expenses/${id}`),
};
