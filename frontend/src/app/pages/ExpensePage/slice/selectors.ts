import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectExpensePageSlice = (state: RootState) =>
  state.expensePage || initialState;

export const selectExpensePage = createSelector(
  [selectExpensePageSlice],
  state => state,
);
