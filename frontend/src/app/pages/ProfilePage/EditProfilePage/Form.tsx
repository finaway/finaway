import { ControlledInputText } from 'app/components/Inputs';
import { selectAuth } from 'app/global-stores/auth/selectors';
import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectEditProfilePage } from './slice/selectors';
import { useSyncFormErrors } from 'app/hooks/useSyncFormErrors';
import { useEditProfilePageSlice } from './slice';

export interface FormRef {
  submit: () => void;
}

interface FormProps {}

interface FormValues {
  name: string;
}

export const Form = forwardRef<FormRef, FormProps>((props, ref) => {
  const dispatch = useDispatch();
  const { actions } = useEditProfilePageSlice();

  const { user } = useSelector(selectAuth);
  const { loadings, errors } = useSelector(selectEditProfilePage);

  const methods = useForm<FormValues>({
    defaultValues: {
      name: user!.name,
    },
  });
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
      {/* Input Name */}
      <ControlledInputText
        name="name"
        label="Name"
        control={control}
        disabled={loadings.updating}
        autoFocus
      />
    </form>
  );
});
