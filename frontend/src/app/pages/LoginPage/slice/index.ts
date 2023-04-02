import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { LoginError, LoginPageState } from './types';
import { api } from 'api';
import { Response } from 'utils/axios';

export const initialState: LoginPageState = {
  message: '',
  errors: {},
  loading: false,
};

const slice = createSlice({
  name: 'loginPage',
  initialState,
  reducers: {
    login(state, action: PayloadAction<Parameters<typeof api.auth.login>[0]>) {
      state.errors = {};
      state.loading = true;
    },
    loginSuccess(
      state,
      action: PayloadAction<
        ReturnType<typeof api.auth.login> extends Promise<Response<infer T>>
          ? T
          : never
      >,
    ) {
      state.loading = false;
    },
    loginError(state, action: PayloadAction<AxiosError | Error>) {
      const err = action.payload;

      if (axios.isAxiosError(err) && err.response) {
        state.errors.message = (err.response.data as LoginError).message;
      }

      state.loading = false;
    },
  },
});

export const { actions: LoginPageActions } = slice;

export const useLoginPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};
