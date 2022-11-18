import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectRouterSlice = (state: RootState) => state.router || initialState;

export const selectRouter = createSelector([selectRouterSlice], state => state);
