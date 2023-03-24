import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { AppState } from './types';

export const initialState: AppState = {
  appBarTitle: '',
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppBarTitle(state, action: PayloadAction<string>) {
      state.appBarTitle = action.payload;
    },
  },
});

export const { actions: AppActions } = slice;

export const useAppSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
