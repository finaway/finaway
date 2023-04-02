import { apiAuth } from './auth';
import { apiExpense } from './expense';
import { apiCurrency } from './currency';
import { apiProfile } from './profile';

export const api = {
  auth: apiAuth,
  expense: apiExpense,
  currency: apiCurrency,
  profile: apiProfile,
};
