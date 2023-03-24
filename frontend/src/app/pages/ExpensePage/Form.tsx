import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectExpensePage } from './slice/selectors';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers';
import { InputNumeric } from 'app/components/Inputs/InputNumeric';
import { Dayjs } from 'dayjs';

export interface FormValues {
  description: string;
  date: Dayjs;
  amount: number;
  currency_id: number;
}

export function Form() {
  const { loadings, currencies } = useSelector(selectExpensePage);

  const { control } = useFormContext<FormValues>();

  return (
    <>
      {/* Input Description */}
      <Controller
        name="description"
        control={control}
        render={({
          field: { onChange, value, onBlur },
          formState: { errors },
        }) => (
          <>
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              margin="normal"
              fullWidth
              label="Description"
              type="text"
              autoComplete="off"
              error={!!errors?.description}
              helperText={errors?.description?.message}
              autoFocus
              disabled={
                loadings.creating || loadings.updating || loadings.showing
              }
            />
          </>
        )}
      />

      {/* Input Date */}
      <Controller
        name="date"
        control={control}
        render={({
          field: { onChange, value, onBlur },
          formState: { errors },
        }) => (
          <DatePicker
            value={value}
            onChange={onChange}
            label="Date"
            slotProps={{
              textField: {
                onBlur: onBlur,
                error: !!errors?.date,
                helperText: errors?.date?.[0],
                fullWidth: true,
                margin: 'normal',
              },
            }}
            disabled={
              loadings.creating || loadings.updating || loadings.showing
            }
          />
        )}
      />

      {/* Input Currency */}
      <Controller
        name="currency_id"
        control={control}
        render={({
          field: { onChange, value, onBlur },
          formState: { errors },
        }) => (
          <TextField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            select
            label="Currency"
            margin="normal"
            error={!!errors?.currency_id}
            helperText={errors?.currency_id?.message}
            fullWidth
            disabled={
              loadings.creating || loadings.updating || loadings.showing
            }
          >
            {currencies.map(currency => (
              <MenuItem key={currency.id} value={currency.id}>
                {currency.name} ({currency.symbol})
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Input Amount */}
      <Controller
        name="amount"
        control={control}
        render={({
          field: { onChange, value, onBlur },
          formState: { errors },
        }) => (
          <TextField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label="Amount"
            name="amount"
            InputProps={{
              inputComponent: InputNumeric as any,
            }}
            margin="normal"
            error={!!errors?.amount}
            helperText={errors?.amount?.message}
            autoComplete="off"
            fullWidth
            disabled={
              loadings.creating || loadings.updating || loadings.showing
            }
          />
        )}
      />
    </>
  );
}
