import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller, FieldValues } from 'react-hook-form';
import { InputNumeric } from '../InputNumeric';
import { Controlled } from '../types/Controlled';

interface ControlledInputNumericProps<T extends FieldValues>
  extends Controlled<T> {}

export function ControlledInputNumeric<T extends FieldValues>({
  // React hook form
  name,
  control,
  rules,
  defaultValue,
  shouldUnregister,
  // Material UI
  id = '',
  label = '',
  autoFocus = false,
  disabled = false,
  // Custom
  'data-testid': dataTestId = '',
}: ControlledInputNumericProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({
        field: { onChange, value, onBlur },
        formState: { errors },
      }) => (
        <>
          <TextField
            name={name}
            id={id}
            label={label}
            type="text"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            InputProps={{
              inputComponent: InputNumeric as any,
            }}
            margin="normal"
            autoComplete="off"
            error={!!errors[name]}
            helperText={errors[name]?.message as React.ReactNode}
            autoFocus={autoFocus}
            disabled={disabled}
            fullWidth
            inputProps={{
              'data-testid': dataTestId,
            }}
          />
        </>
      )}
    />
  );
}
