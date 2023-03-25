import * as React from 'react';
import { render, renderHook } from '@testing-library/react';

import { ControlledInputDate } from '..';
import { useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface FormValues {
  test: string;
}

describe('<ControlledInputDate />', () => {
  const { result } = renderHook(() => useForm<FormValues>());
  const { control } = result.current;

  it('should match snapshot', () => {
    const loadingIndicator = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ControlledInputDate control={control} name="test" label="Input Test" />
      </LocalizationProvider>,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
