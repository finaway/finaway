import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectLoginPageSlice = (state: RootState) =>
  state.loginPage || initialState;

export const selectLoginPage = createSelector(
  [selectLoginPageSlice],
  state => state,
);
