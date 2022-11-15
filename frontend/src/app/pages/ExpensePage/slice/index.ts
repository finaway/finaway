import { PayloadAction } from '@reduxjs/toolkit';
import { Expense } from 'models';
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
  },
  expenses: [],
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
  },
});

export const { actions: Actions } = slice;

export const useExpensePageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};
