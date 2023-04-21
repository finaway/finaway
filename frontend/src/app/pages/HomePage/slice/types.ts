/* --- STATE --- */
export interface HomePageState {
  weekly_income: number | undefined;
  weekly_expenses: number | undefined;
  monthly_income: number | undefined;
  monthly_expenses: number | undefined;
  yearly_income: number | undefined;
  yearly_expenses: number | undefined;

  loadings: {
    weekly: boolean;
    monthly: boolean;
    yearly: boolean;
  };
}

export interface IncomeExpenseResponse {
  total_income: number;
  total_expenses: number;
}
