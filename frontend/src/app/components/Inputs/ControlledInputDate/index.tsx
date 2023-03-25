import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { Controlled } from '../types/Controlled';

interface ControlledInputDateProps<T extends FieldValues>
  extends Controlled<T> {}

export function ControlledInputDate<T extends FieldValues>({
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
}: ControlledInputDateProps<T>) {
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
          <DatePicker
            label={label}
            value={value}
            onChange={onChange}
            slotProps={{
              textField: {
                name: name,
                id: id,
                onBlur: onBlur,
                error: !!errors[name],
                helperText: errors[name]?.message as React.ReactNode,
                fullWidth: true,
                margin: 'normal',
                autoFocus: autoFocus,
                inputProps: {
                  'data-testid': dataTestId,
                },
              },
            }}
            disabled={disabled}
          />
        </>
      )}
    />
  );
}
