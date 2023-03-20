import { Expense } from 'models';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { useExpensePageSlice } from './../slice';
import { selectExpensePage } from './../slice/selectors';
import { Form, FormValues } from './Form';

export function ExpenseCreate() {
  const dispatch = useDispatch();
  const { actions } = useExpensePageSlice();
  const { loadings, currencies } = useSelector(selectExpensePage);

  const handleSubmit = (values: FormValues) => {
    const payload: Expense = { ...values };

    dispatch(actions.createExpense(payload));
  };

  useEffectOnce(() => {
    dispatch(actions.fetchCurrencies());
  });

  return (
    <Form
      currencies={currencies}
      loadings={loadings}
      onSubmit={handleSubmit}
      errors={{}}
    />
  );
}
