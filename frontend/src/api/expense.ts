import { Expense } from './../models/Expense';
import { axios, Response } from 'utils/axios';

export const apiExpense = {
  getAll: () => axios.get<Response<Expense[]>>('/expenses'),
  create: (body: Expense) => axios.post<Response<Expense>>('/expenses', body),
};
