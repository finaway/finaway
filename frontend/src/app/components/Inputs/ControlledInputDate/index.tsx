import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseControllerProps,
} from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';

interface ControlledInputDateProps<T extends FieldValues>
  extends UseControllerProps<T> {
  name: Path<T>;
  control: Control<T, any>;
  id?: string;
  label?: React.ReactNode;
  autoFocus?: boolean;
  disabled?: boolean;
}

export function ControlledInputDate<T extends FieldValues = FieldValues>({
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
              },
            }}
            disabled={disabled}
          />
        </>
      )}
    />
  );
}
