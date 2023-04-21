import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.editPasswordPage || initialState;

export const selectEditPasswordPage = createSelector(
  [selectSlice],
  state => state,
);
