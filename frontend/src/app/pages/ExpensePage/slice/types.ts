import { Currency, Expense } from 'models';

export interface ExpensePageState {
  loadings: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
    deleting_id: number | null;

    currencies_fetching: boolean;
  };
  expenses: Expense[];
  currencies: Currency[];
  errors: {
    description?: string[];
    amount?: string[];
    currency_id?: string[];
    date?: string[];
  };
}
