import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import { FormProvider, useForm } from 'react-hook-form';
import { Form, FormValues } from './Form';
import { useDispatch, useSelector } from 'react-redux';
import { useExpensePageSlice } from './slice';
import { Expense } from 'models';
import { useEffectOnce } from 'react-use';
import { selectExpensePage } from './slice/selectors';
import dayjs from 'dayjs';

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
}

const defaultValues = {
  description: '',
  amount: 0,
  currency_id: 0,
  date: dayjs(),
};

export function FormDialog({ open, onClose }: FormDialogProps) {
  const dispatch = useDispatch();
  const { actions } = useExpensePageSlice();
  const { loadings, errors, formData } = useSelector(selectExpensePage);

  const isEditing = !!formData?.id;

  const formCtx = useForm<FormValues>({
    defaultValues: defaultValues,
  });

  const onSubmit = (values: FormValues) => {
    const payload: Expense = {
      ...values,
      date: values?.date?.format('YYYY-MM-DD'),
    };

    if (isEditing) {
      dispatch(
        actions.updateExpense({ id: formData.id as number, data: payload }),
      );
    } else {
      dispatch(actions.createExpense(payload));
    }
  };

  useEffectOnce(() => {
    dispatch(actions.fetchCurrencies());
  });

  // Sync errors from redux to form context
  useEffect(() => {
    Object.entries(errors).forEach(([key, value]) => {
      formCtx.setError(key as keyof FormValues, {
        type: 'manual',
        message: value?.[0],
      });
    });
  }, [errors, formCtx]);

  // Sync form data from redux to form context
  useEffect(() => {
    if (formData) {
      formCtx.reset({
        ...formData,
        date: dayjs(formData?.date),
      });
    } else {
      formCtx.reset(defaultValues);
    }
  }, [formCtx, formData]);

  // Reset form context when dialog is closed
  useEffect(() => {
    if (!open) {
      formCtx.reset(defaultValues);
    }
  }, [formCtx, open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <FormProvider {...formCtx}>
        <form onSubmit={formCtx.handleSubmit(onSubmit)}>
          <DialogTitle>
            {isEditing ? 'Edit Expense' : 'Add Expense'}
          </DialogTitle>
          <DialogContent>
            {loadings.showing && <LinearProgress />}
            <Form />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <LoadingButton
              type="submit"
              variant="contained"
              disabled={
                loadings.creating || loadings.updating || loadings.showing
              }
              loading={loadings.creating || loadings.updating}
            >
              {isEditing ? 'Update' : 'Add'}
            </LoadingButton>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
