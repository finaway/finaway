import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { homePageSaga } from './saga';
import { HomePageState, IncomeExpenseResponse } from './types';

export const initialState: HomePageState = {
  weekly_income: undefined,
  weekly_expenses: undefined,
  monthly_income: undefined,
  monthly_expenses: undefined,
  yearly_income: undefined,
  yearly_expenses: undefined,
  loadings: {
    weekly: false,
    monthly: false,
    yearly: false,
  },
};

const slice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    /** Weekly */
    getWeekly(state) {
      state.loadings.weekly = true;
    },
    getWeeklySuccess(state, action: PayloadAction<IncomeExpenseResponse>) {
      state.loadings.weekly = false;
      state.weekly_income = action.payload.total_income;
      state.weekly_expenses = action.payload.total_expenses;
    },
    getWeeklyError(state) {
      state.loadings.weekly = false;
    },

    /** Monthly */
    getMonthly(state) {
      state.loadings.monthly = true;
    },
    getMonthlySuccess(state, action: PayloadAction<IncomeExpenseResponse>) {
      state.loadings.monthly = false;
      state.monthly_income = action.payload.total_income;
      state.monthly_expenses = action.payload.total_expenses;
    },
    getMonthlyError(state) {
      state.loadings.monthly = false;
    },

    /** Yearly */
    getYearly(state) {
      state.loadings.yearly = true;
    },
    getYearlySuccess(state, action: PayloadAction<IncomeExpenseResponse>) {
      state.loadings.yearly = false;
      state.yearly_income = action.payload.total_income;
      state.yearly_expenses = action.payload.total_expenses;
    },
    getYearlyError(state) {
      state.loadings.yearly = false;
    },
  },
});

export const { actions: homePageActions } = slice;

export const useHomePageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: homePageSaga });
  return { actions: slice.actions };
};
