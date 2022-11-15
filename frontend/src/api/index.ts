import { apiAuth } from './auth';
import { apiExpense } from './expense';
import { apiCurrency } from './currency';

export const api = {
  auth: apiAuth,
  expense: apiExpense,
  currency: apiCurrency,
};
