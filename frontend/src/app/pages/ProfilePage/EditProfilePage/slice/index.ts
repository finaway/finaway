import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { editProfilePageSaga } from './saga';
import { EditProfilePageState, EditProfilePageUpdateError } from './types';
import axios, { AxiosError } from 'axios';
import { api } from 'api';

export const initialState: EditProfilePageState = {
  loadings: {
    updating: false,
  },
  errors: {},
};

const slice = createSlice({
  name: 'editProfilePage',
  initialState,
  reducers: {
    update(
      state,
      action: PayloadAction<Parameters<typeof api.profile.update>[0]>,
    ) {
      state.loadings.updating = true;
    },
    updateSuccess(state) {
      state.loadings.updating = false;
    },
    updateError(state, action: PayloadAction<AxiosError | Error>) {
      state.loadings.updating = false;

      const err = action.payload;
      if (axios.isAxiosError(err) && err.response) {
        state.errors = (err.response.data as EditProfilePageUpdateError).errors;
      }
    },
  },
});

export const { actions: editProfilePageActions } = slice;

export const useEditProfilePageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: editProfilePageSaga });
  return { actions: slice.actions };
};
