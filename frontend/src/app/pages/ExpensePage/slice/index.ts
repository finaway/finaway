import { PayloadAction } from '@reduxjs/toolkit';
import { Currency, Expense } from 'models';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { Response } from 'utils/axios';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { ExpensePageState } from './types';

export const initialState: ExpensePageState = {
  loadings: {
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
    deleting_id: null,

    currencies_fetching: false,
  },
  expenses: [],
  currencies: [],
  errors: {},
};

const slice = createSlice({
  name: 'expensePage',
  initialState,
  reducers: {
    fetchExpense(state) {
      state.loadings.fetching = true;
    },
    fetchExpenseSuccess(state, action: PayloadAction<Response<Expense[]>>) {
      state.loadings.fetching = false;
      state.expenses = action.payload.data;
    },
    fetchExpenseError(state, action: PayloadAction<any>) {
      state.loadings.fetching = false;
    },

    createExpense(state, action: PayloadAction<Expense>) {
      state.loadings.creating = true;
      state.errors = {};
    },
    createExpenseSuccess(state, action: PayloadAction<Response<Expense>>) {
      state.loadings.creating = false;
      state.expenses.push(action.payload.data);
    },
    createExpenseError(state, action: PayloadAction<any>) {
      state.loadings.creating = false;

      if (action.payload.response) {
        state.errors = action.payload.response.data.errors;
      }
    },

    deleteExpense(state, action: PayloadAction<number>) {
      state.loadings.deleting = true;
      state.loadings.deleting_id = action.payload;
    },
    deleteExpenseSuccess(state, action: PayloadAction<Response<Expense>>) {
      state.loadings.deleting = false;
      state.expenses = state.expenses.filter(
        expense => expense.id !== state.loadings.deleting_id,
      );
    },
    deleteExpenseError(state, action: PayloadAction<any>) {
      state.loadings.deleting = false;
      state.loadings.deleting_id = null;
    },

    fetchCurrencies(state) {
      state.loadings.currencies_fetching = true;
    },
    fetchCurrenciesSuccess(state, action: PayloadAction<Response<Currency[]>>) {
      state.loadings.currencies_fetching = false;
      state.currencies = action.payload.data;
    },
    fetchCurrenciesError(state, action: PayloadAction<any>) {
      state.loadings.currencies_fetching = false;
    },
  },
});

export const { actions: Actions } = slice;

export const useExpensePageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};
