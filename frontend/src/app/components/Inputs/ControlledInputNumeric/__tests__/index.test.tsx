import * as React from 'react';
import { render, renderHook } from '@testing-library/react';

import { ControlledInputNumeric } from '..';
import { useForm } from 'react-hook-form';

interface FormValues {
  test: string;
}

describe('<ControlledInputNumeric />', () => {
  const { result } = renderHook(() => useForm<FormValues>());
  const { control } = result.current;

  it('should match snapshot', () => {
    const loadingIndicator = render(
      <ControlledInputNumeric
        control={control}
        name="test"
        label="Input Test"
      />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
