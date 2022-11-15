import { Expense } from 'models';

export interface ExpensePageState {
  loadings: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
  expenses: Expense[];
}
