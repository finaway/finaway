import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.forgotPasswordPage || initialState;

export const selectForgotPasswordPage = createSelector(
  [selectSlice],
  state => state,
);
