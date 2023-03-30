import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { forgotPasswordPageSaga } from './saga';
import { ForgotPasswordPageState } from './types';

export const initialState: ForgotPasswordPageState = {
  errors: {},
  loading: false,
};

const slice = createSlice({
  name: 'forgotPasswordPage',
  initialState,
  reducers: {},
});

export const { actions: forgotPasswordPageActions } = slice;

export const useForgotPasswordPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: forgotPasswordPageSaga });
  return { actions: slice.actions };
};
