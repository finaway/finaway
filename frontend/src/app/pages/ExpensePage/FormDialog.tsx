import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormProvider, useForm } from 'react-hook-form';
import { Form, FormValues } from './Form';
import { useDispatch, useSelector } from 'react-redux';
import { useExpensePageSlice } from './slice';
import { Expense } from 'models';
import { useEffectOnce } from 'react-use';
import { selectExpensePage } from './slice/selectors';
import dayjs from 'dayjs';

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FormDialog({ isOpen, onClose }: FormDialogProps) {
  const dispatch = useDispatch();
  const { actions } = useExpensePageSlice();
  const { loadings, errors } = useSelector(selectExpensePage);

  const formCtx = useForm<FormValues>({
    defaultValues: {
      description: '',
      amount: 0,
      currency_id: 0,
      date: dayjs(),
    },
  });

  const onSubmit = (values: FormValues) => {
    const payload: Expense = {
      ...values,
      date: values?.date?.format('YYYY-MM-DD'),
    };

    dispatch(actions.createExpense(payload));
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

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <FormProvider {...formCtx}>
        <form onSubmit={formCtx.handleSubmit(onSubmit)}>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogContent>
            <Form />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loadings.creating}
            >
              Add
            </LoadingButton>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
