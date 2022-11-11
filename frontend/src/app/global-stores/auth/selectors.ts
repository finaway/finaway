import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectAuthSlice = (state: RootState) => state?.auth || initialState;

export const selectAuth = createSelector([selectAuthSlice], state => state);
