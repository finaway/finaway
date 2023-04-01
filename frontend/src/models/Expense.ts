import { Currency } from './Currency';

export interface Expense {
  id?: number;
  amount?: number;
  description?: string;
  date?: string;
  currency_id?: number;
  currency?: Currency;

  created_at?: string;
  updated_at?: string;
}
