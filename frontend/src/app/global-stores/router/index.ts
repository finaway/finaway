import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { RouterState } from './types';

export const initialState: RouterState = {
  counter: 0,
  action: '',
  param: '',
};

const slice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    push(state, action: PayloadAction<string>) {
      state.action = 'push';
      state.param = action.payload;
      state.counter += 1;
    },
    replace(state, action: PayloadAction<string>) {
      state.action = 'replace';
      state.param = action.payload;
      state.counter += 1;
    },
  },
});

export const { actions: RouterActions } = slice;

export const useRouterSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
