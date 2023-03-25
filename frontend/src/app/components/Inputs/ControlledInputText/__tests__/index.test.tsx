import * as React from 'react';
import { render, renderHook } from '@testing-library/react';

import { ControlledInputText } from '..';
import { useForm } from 'react-hook-form';

interface FormValues {
  test: string;
}

describe('<ControlledInputText />', () => {
  const { result } = renderHook(() => useForm<FormValues>());
  const { control } = result.current;

  it('should match snapshot', () => {
    const loadingIndicator = render(
      <ControlledInputText control={control} name="test" label="Input Test" />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });

  it('input should be disabled', () => {
    const { getByTestId } = render(
      <ControlledInputText
        control={control}
        name="test"
        label="Input Test"
        disabled
        data-testid="input-test"
      />,
    );
    expect(getByTestId('input-test')).toBeDisabled();
  });

  it('input should be autofocus', () => {
    const { getByTestId } = render(
      <ControlledInputText
        control={control}
        name="test"
        label="Input Test"
        data-testid="input-test"
        autoFocus
      />,
    );
    expect(getByTestId('input-test')).toHaveFocus();
  });

  it('input should be type password', () => {
    const { getByTestId } = render(
      <ControlledInputText
        control={control}
        name="test"
        label="Input Test"
        data-testid="input-test"
        type="password"
      />,
    );
    expect(getByTestId('input-test')).toHaveAttribute('type', 'password');
  });

  it('input label should be Input Test', () => {
    const red = render(
      <ControlledInputText
        control={control}
        name="test"
        label="Input Test"
        data-testid="input-test"
      />,
    );

    expect(red.getByTestId('input-test').parentNode).toHaveTextContent(
      'Input Test',
    );
  });
});
