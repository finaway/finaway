import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { LoginError, LoginPageState } from './types';

export const initialState: LoginPageState = {
  message: '',
  errors: {},
  loading: false,
};

const slice = createSlice({
  name: 'loginPage',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {},
    loginError(state, action: PayloadAction<AxiosError | Error>) {
      const err = action.payload;

      if (axios.isAxiosError(err) && err.response) {
        state.errors.message = (err.response.data as LoginError).message;
      }
    },
  },
});

export const { actions: LoginPageActions } = slice;

export const useLoginPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};
