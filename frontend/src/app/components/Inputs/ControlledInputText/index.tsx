import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller, FieldValues } from 'react-hook-form';
import { Controlled } from '../types/Controlled';

interface ControlledInputTextProps<T extends FieldValues>
  extends Controlled<T> {
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
}

export function ControlledInputText<T extends FieldValues>({
  // React hook form
  name,
  control,
  rules,
  defaultValue,
  shouldUnregister,
  // Material UI
  id = '',
  type = 'text',
  label = '',
  autoFocus = false,
  disabled = false,
}: ControlledInputTextProps<T>) {
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
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            margin="normal"
            autoComplete="off"
            error={!!errors[name]}
            helperText={errors[name]?.message as React.ReactNode}
            autoFocus={autoFocus}
            disabled={disabled}
            fullWidth
          />
        </>
      )}
    />
  );
}
