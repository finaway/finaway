import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectExpensePage } from './slice/selectors';
import { Dayjs } from 'dayjs';
import {
  ControlledInputDate,
  ControlledInputNumeric,
  ControlledInputText,
  ControlledSelect,
} from 'app/components/Inputs';
import { currenciesToOptions } from 'models/Currency';

export interface FormValues {
  description: string;
  date: Dayjs;
  amount: number;
  currency_id: number;
}

export function Form() {
  const { loadings, currencies } = useSelector(selectExpensePage);

  const { control } = useFormContext<FormValues>();

  const optionCurrency = currenciesToOptions(currencies);

  return (
    <>
      {/* Input Description */}
      <ControlledInputText
        name="description"
        label="Description"
        control={control}
        autoFocus
        disabled={loadings.creating || loadings.updating || loadings.showing}
      />

      {/* Input Date */}
      <ControlledInputDate
        name="date"
        label="Date"
        control={control}
        disabled={loadings.creating || loadings.updating || loadings.showing}
      />

      {/* Input Currency */}
      <ControlledSelect
        name="currency_id"
        label="Currency"
        control={control}
        options={optionCurrency}
        disabled={loadings.creating || loadings.updating || loadings.showing}
      />

      {/* Input Amount */}
      <ControlledInputNumeric
        name="amount"
        label="Amount"
        control={control}
        disabled={loadings.creating || loadings.updating || loadings.showing}
      />
    </>
  );
}
