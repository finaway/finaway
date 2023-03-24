import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectAppSlice = (state: RootState) => state.app || initialState;

export const selectApp = createSelector([selectAppSlice], state => state);
