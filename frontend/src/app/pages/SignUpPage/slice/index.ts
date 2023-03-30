import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { SignUpPageState } from './types';
import { User } from 'models';
import { Response } from 'utils/axios';

export const initialState: SignUpPageState = {
  errors: {},
  loadings: {
    signUp: false,
  },
};

const slice = createSlice({
  name: 'signupPage',
  initialState,
  reducers: {
    signUp(state, action: PayloadAction<any>) {
      state.loadings.signUp = true;
    },
    signUpSuccess(state, action: PayloadAction<Response<User>>) {
      state.loadings.signUp = false;
    },
    signUpError(state, action: PayloadAction<any>) {
      state.loadings.signUp = false;

      if (action.payload.response) {
        state.errors = action.payload.response.data.errors;
      }
    },
  },
});

export const { actions: Actions } = slice;

export const useSignUpPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};
