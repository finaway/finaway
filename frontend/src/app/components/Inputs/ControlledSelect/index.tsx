import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseControllerProps,
} from 'react-hook-form';
import { SelectOption } from 'types/SelectOption';

interface ControlledSelectProps<T extends FieldValues>
  extends UseControllerProps<T> {
  name: Path<T>;
  control: Control<T, any>;
  options: SelectOption[];
  id?: string;
  label?: React.ReactNode;
  autoFocus?: boolean;
  disabled?: boolean;
}

export function ControlledSelect<T extends FieldValues = FieldValues>({
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
  options,
}: ControlledSelectProps<T>) {
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
            select
            name={name}
            id={id}
            label={label}
            type="text"
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
          >
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </>
      )}
    />
  );
}
