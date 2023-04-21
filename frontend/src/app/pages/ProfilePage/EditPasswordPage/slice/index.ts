import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { editPasswordPageSaga } from './saga';
import { EditPasswordPageState, EditPasswordPageUpdateError } from './types';
import { api } from 'api';
import axios, { AxiosError } from 'axios';

export const initialState: EditPasswordPageState = {
  loadings: {
    updating: false,
  },
  errors: {},
};

const slice = createSlice({
  name: 'editPasswordPage',
  initialState,
  reducers: {
    update(
      state,
      action: PayloadAction<Parameters<typeof api.profile.updatePassword>[0]>,
    ) {
      state.loadings.updating = true;
      state.errors = {};
    },
    updateSuccess(state) {
      state.loadings.updating = false;
      state.errors = {};
    },
    updateError(state, action: PayloadAction<AxiosError | Error>) {
      state.loadings.updating = false;

      const err = action.payload;
      if (axios.isAxiosError(err) && err.response) {
        state.errors = (
          err.response.data as EditPasswordPageUpdateError
        ).errors;
      }
    },
  },
});

export const { actions: editPasswordPageActions } = slice;

export const useEditPasswordPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: editPasswordPageSaga });
  return { actions: slice.actions };
};
