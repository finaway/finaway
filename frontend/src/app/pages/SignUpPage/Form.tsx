import React from 'react';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';

import { selectSignUpPage } from './slice/selectors';
import { useSignUpPageSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { ControlledInputText } from 'app/components/Inputs';
import { useSyncFormErrors } from 'app/hooks/useSyncFormErrors';

type FormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export function Form() {
  const dispatch = useDispatch();

  const { actions } = useSignUpPageSlice();
  const { loadings, errors } = useSelector(selectSignUpPage);

  const methods = useForm<FormValues>();
  const { handleSubmit, control } = methods;

  useSyncFormErrors<FormValues>(methods, errors);

  const onSubmit = (data: FormValues) => {
    dispatch(actions.signUp(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Input Name */}
      <ControlledInputText
        name="name"
        label="Name"
        control={control}
        autoFocus
        disabled={loadings.signUp}
      />

      {/* Input Email */}
      <ControlledInputText
        name="email"
        label="Email"
        control={control}
        autoFocus
        disabled={loadings.signUp}
      />

      {/* Input Password */}
      <ControlledInputText
        name="password"
        label="Password"
        type="password"
        control={control}
        autoFocus
        disabled={loadings.signUp}
      />

      {/* Input Password Confirmation */}
      <ControlledInputText
        name="password_confirmation"
        label="Password Confirmation"
        type="password"
        control={control}
        autoFocus
        disabled={loadings.signUp}
      />

      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        loading={loadings.signUp}
      >
        Sign In
      </LoadingButton>
    </form>
  );
}
