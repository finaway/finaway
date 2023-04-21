import { ControlledInputText } from 'app/components/Inputs';
import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useSyncFormErrors } from 'app/hooks/useSyncFormErrors';
import { useEditPasswordPageSlice } from './slice';
import { selectEditPasswordPage } from './slice/selectors';

export interface FormRef {
  submit: () => void;
}

interface FormProps {}

interface FormValues {
  old_password: string;
  password: string;
  password_confirmation: string;
}

export const Form = forwardRef<FormRef, FormProps>((props, ref) => {
  const dispatch = useDispatch();
  const { actions } = useEditPasswordPageSlice();

  const { loadings, errors } = useSelector(selectEditPasswordPage);

  const methods = useForm<FormValues>();
  const { control, handleSubmit } = methods;

  useSyncFormErrors<FormValues>(methods, errors);

  const onSubmit = (data: FormValues) => {
    dispatch(actions.update(data));
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Old Password */}
      <ControlledInputText
        name="old_password"
        label="Old Password*"
        type="password"
        control={control}
        disabled={loadings.updating}
        autoFocus
      />

      {/* Password */}
      <ControlledInputText
        name="password"
        label="Password*"
        type="password"
        control={control}
        disabled={loadings.updating}
      />

      {/* Password Confirmation */}
      <ControlledInputText
        name="password_confirmation"
        label="Password Confirmation*"
        type="password"
        control={control}
        disabled={loadings.updating}
      />
    </form>
  );
});
