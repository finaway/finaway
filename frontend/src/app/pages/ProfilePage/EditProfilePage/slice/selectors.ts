import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.editProfilePage || initialState;

export const selectEditProfilePage = createSelector(
  [selectSlice],
  state => state,
);
