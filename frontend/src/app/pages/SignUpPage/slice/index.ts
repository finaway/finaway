import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { SignUpPageState } from './types';

export const initialState: SignUpPageState = {
  errors: {},
  loading: false,
};

const slice = createSlice({
  name: 'signupPage',
  initialState,
  reducers: {
    signup(state, action: PayloadAction<any>) {
      // do something...
    },
  },
});

export const { actions: SignUpPageActions } = slice;

export const useSignUpPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};
