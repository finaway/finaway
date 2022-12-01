import { Currency, Expense } from 'models';

export interface ExpensePageState {
  loadings: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;

    currencies_fetching: boolean;
  };
  expenses: Expense[];
  currencies: Currency[];
}
