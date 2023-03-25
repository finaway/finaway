import React from 'react';
import {
  Control,
  FieldValues,
  Path,
  UseControllerProps,
} from 'react-hook-form';

export interface Controlled<T extends FieldValues>
  extends UseControllerProps<T> {
  name: Path<T>;
  control: Control<T, any>;
  id?: string;
  label?: React.ReactNode;
  autoFocus?: boolean;
  disabled?: boolean;
  'data-testid'?: string;
}
